import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const Item = styled.p`
    margin: 10px;
    font-size: 40px;
    font-weight: bold;
`
const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
const getRandomNumber = () => {
    return Math.floor(Math.random()*4) + 3
}
const DisplayContainer = () => {
    const [count,setCount] = useState(0)
    const [renderText,setRenderText] = useState('')
    const getText = () => {
        let alt = getRandomNumber()
        let temp = []
        console.log(temp == renderText)
        for (let i = count; i < count + alt; i++) {
            temp.push(tempText[i])
        }
        setCount(prev => prev + alt)
        setRenderText(temp)

    }
    
    let tempText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ")
    
    let textLength = tempText.length
    
    
    return(
        <Container>
            {renderText && 
            renderText.map(
                (item) => <Item style={{color:getRandomColor()}}>{item}</Item>
            )
            }

            <button onClick={getText}>test</button>
        </Container>
    )
}

export default DisplayContainer;