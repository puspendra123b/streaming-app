import one from '/images/onepiece.jpg'

export function Card(){
    return (
        <div style={{
            display : "flex",
            height : '300px',
            width  : "290px",
            
        }}>
            <div style={{
                height : '300px',
                width  : "auto",
                
            }}>
                <div style={{
                display : 'flex',
                transform : "rotate(-90deg)",
                marginTop : '240px'
                }}>
                    <div style={{
                    display : 'flex',
                    marginTop : '',
                    transform : "rotate(90deg)",
                    }}>01</div>

                    <div style={{
                        marginLeft : "10px",
                        width : "100px"
                    }}>One Piece</div>
                </div>
                
            </div>
            <div style={{
                height : '300px',
                width  : "200px"
            }}>
            <img style={{
                margin : '',
                height : '300px'
            }}
            src={one} alt="one-piece" />
            </div>
            
        </div>
    )
}