require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { google } = require("googleapis");
const stream = require("stream");
const fs = require("fs");
const cors = require("cors");
const readline = require("readline");
const path = require("path");
const { uploader, deleteImage, getUrl } = require("./image");
// const { Collection } = require('./Db/index');
const { PrismaClient } = require("@prisma/client");
const up = multer({ dest: "uploads/" });

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.use(cors());
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
// console.log(" upper OAuth2 credentials:", oauth2Client._clientId);

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Load tokens from a file or environment variable if available
if (fs.existsSync("tokens.json")) {
  // console.log("sync");
  const tokens = JSON.parse(fs.readFileSync("tokens.json", "utf8"));
  oauth2Client.setCredentials(tokens);
  // console.log(tokens);
}

// Save tokens to a file
// function saveTokens(tokens) {
//   fs.writeFileSync("tokens.json", JSON.stringify(tokens));
// }

// OAuth2 callback route
app.get("/oauth2callback", (req, res) => {
  const code = req.query.code;
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) return res.status(500).send("Error retrieving access token");
    // console.log("this is token : ", tokens);
    oauth2Client.setCredentials(tokens);
    // saveTokens(tokens);
    res.json(tokens);
  });
});

// async function refreshTokenIfNeeded() {
//   if (oauth2Client.isTokenExpiring()) {
//     const newTokens = await oauth2Client.refreshAccessToken();
//     oauth2Client.setCredentials(newTokens.tokens);
//     saveTokens(newTokens.tokens);
//   }
// }

// OAuth2 consent route
app.get("/auth", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  // console.log(authUrl);
  res.redirect("http://localhost:5174/home");
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the code from that page here: ", (code) => {
  rl.close();
  oauth2Client.getToken(code, (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    // console.log("Your refresh token is:", token.refresh_token);
  });
});

// Middleware to ensure the OAuth2 client has valid credentials
function ensureAuthenticated(req, res, next) {
  console.log("inside the middleware");
  // console.log("OAuth2 credentials:", oauth2Client.credentials);
  if (!oauth2Client.credentials || !oauth2Client.credentials.access_token) {
    console.log("Redirecting to /auth");
    return res.redirect("/auth");
  }
  console.log("exiting the middleware");
  next();
}



// Video Upload Endpoint
app.post("/upload", ensureAuthenticated, upload.single("video"), async (req, res) => {
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    const body = req.body;

    const fileMetadata = {
      name: req.body.title,
    };

    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    const media = {
      mimeType: req.file.mimetype,
      body: bufferStream,
    };

    try {
      const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id, webContentLink, webViewLink",
      });

      const r = await prisma.episodes.create({
        data: {
          Title: body.title,
          Description: body.description,
          CDN_id: response.data.id,
          collection_id: parseInt(body.collection_id)
        },
      });
      // console.log(r);
      

      res.status(200).send(response.data);
    } catch (error) {
      console.error(
        "Error uploading file:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("Error uploading file");
    }
  }
);

// Stream endpoint
app.get("/stream/:fileId", ensureAuthenticated, async (req, res) => {
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const fileId = req.params.fileId;
  try {
    const response = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );
    response.data
      .on("end", () => {
        console.log("Done streaming file");
      })
      .on("error", (err) => {
        console.error(err);
        res.status(500).send("Error streaming file");
      })
      .pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching file");
  }
});

// To create a new collection
app.post("/create-collection", up.single("file"), async (req, res) => {
  try {
    const body = req.body;
    // console.log(body);

    const result = await uploader(req.file.path);

    fs.unlinkSync(req.file.path);

    // await Collection.create({
    //   title : body.title,
    //   description : body.description,
    //   CDN_id : result.public_id
    // }).then(()=>{
    //   res.json({
    //     msg : "Collection created successfully"
    //   })
    // })

    const r = await prisma.collection.create({
      data: {
        Title: body.title,
        Description: body.description,
        Image_id: result.public_id,
        No_of_episodes: 0,
      },
    });

    // console.log(r);

    res.json({
      response: "Collection created successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
});

// To get the list of all the collection present in the DB
app.get("/getAllCollection", async (req, res) => {
  const collection = await prisma.collection.findMany();
  let responseCol = []
  collection.map((col)=>{
    const imageUrl = getUrl(col.Image_id)
    responseCol = [
      ...responseCol,
      {
        id : col.id,
        Title : col.Title,
        Description : col.Description,
        Image_id : col.Image_id,
        No_of_episodes : col.No_of_episodes,
        imageUrl : imageUrl
      }
    ]
  })

  res.json(responseCol);
});

// To get all episodes of certain collection
app.post("/getAllEpisodes", async (req, res) => {
  const body = req.body;
  const collection = await prisma.episodes.findMany({
    where: {
      collection_id: body.id,
    },
  });

  res.json(collection);
});

// Deleting the collection and the image of that collection form the colunary
app.delete("/deleteCollection", async (req, res) => {
  const body = req.body;


  try {
    
    const collection = await prisma.collection.findUnique({
      where: {
        id: body.id,
      },
    });
  
    if (collection) {
      const deletedCollection = await prisma.collection.delete({
        where: {
          id: body.id,
        },
      });
  
      await deleteImage(body.Image_id);
  
      if (deletedCollection) {
        res.json({
          response: "Collection Deleted",
          isSuccess: true,
        });
      } else {
        res.json({
          response: "Collection Not Deleted",
          isSuccess: false,
        });
      }
    } else {
      res.json({
        response: "Collection Not Exists",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
      response: "Error Occured",
      isSuccess: false,
    });
  }

});


app.delete("/deleteEpisode", async (req, res) => {
  const body = req.body;


  try {
    
    const episode = await prisma.episodes.findMany({
      where: {
        Id : body.id,
        collection_id: body.collection_id,
      },
    });
  
    if (episode) {
       const deletedEpisodes = await prisma.episodes.delete({
        where: {
          Id : body.id,
          collection_id: body.collection_id,
        },
      });
  
  
      if (deletedEpisodes) {
        res.json({
          response: "Episode Deleted",
          isSuccess: true,
        });
      } else {
        res.json({
          response: "Episode Not Deleted",
          isSuccess: false,
        });
      }
    } else {
      res.json({
        response: "Episode Not Exists",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
      response: "Error Occured",
      isSuccess: false,
    });
  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
