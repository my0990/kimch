import styled from "styled-components";
import { useState, useEffect  } from "react";
import kimch from '../media2.gif'
import kimchAudio from '../kimchAudio.mp3';


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`

// 색깔 17개
const colorArr = ['black','red','purple','fuchsia','green','navy','brown','fuchsia','olive','gray','maroon','darkgreen','indigo','tomato','skyblue']

// let tempText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ")

const Item = styled.p`
    margin: 10px;
    font-size: 140px;
    font-weight: bold;
`
// const getRandomColor = () => {
//     return "#" + Math.floor(Math.random() * 16777215).toString(16);
// }


// num길이의 무작위 색깔배열 반환
const getRandomColor = (num) => {
    let tmpArr = []
    let tmpColorArr = [...colorArr].sort(() => 0.5 - Math.random())
    for (let i = 0; i < num; i++) {
        tmpArr.push(tmpColorArr.pop())
    }
    return tmpArr
    
}



const DisplayContainer = ({value}) => {
    const [count,setCount] = useState(0)
    const [renderText,setRenderText] = useState('')
    const [colorCount,setColorCount] = useState(0)
    const [isKimch,setIsKimch] = useState(false);
    // const audio = new Audio(kimchAudio)
    const [audio,setAudio] = useState(new Audio(kimchAudio))
    const getText = () => {
        // let alt = getRandomNumber()
        console.log('count: ', count)
        console.log('value: ', value.length)
        if(value.length == 0 || count == value.length){
            return false
        }
        let tempText = value[count].split(" ") //매 라운드 문장
        const tmpColorArr = getRandomColor(tempText.length) //매 라운드 단어 수만큼의 색깔 배열 
        let temp = []  //단어와 색깔 매치 ex) [['hello','red']]

        for (let i = 0; i < tempText.length; i++) {
            temp.push([tempText[i],tmpColorArr[i]])
            console.log(i)
        }
        console.log('temp: ', temp)
        setCount(prev => prev + 1)
        setRenderText(temp)
        setColorCount(0);
        setIsKimch(false)
        audio.pause()
        audio.currentTime = 0
    }


    const makeColorWhite = () => {
        let tmp = [...renderText]
        if(colorCount == tmp.length){
            let temp = Math.random()
            if(temp > 0.5){
                setIsKimch(true)
                audio.play()
            } else {
                getText()
            }
        } else {
            
            console.log('tmp: ', tmp)
            tmp[colorCount][1] = 'white'
            setRenderText(tmp)
            setColorCount(colorCount+1)
        }

        
    }
    useEffect(()=>{
        getText()
    },[])

    
    
    
    
        return(
            <Container>
                {isKimch 
                ? null
                :renderText && 
                renderText.map(
                    (item) => <Item style={{color:item[1]}}>{item[0]}</Item>
                )}
                
               {isKimch && <button onClick={getText}>next</button>}
                <img src={isKimch ? kimch: null} />
                {/* <button onClick={()=>{setIsKimch(!isKimch)}}>kimch</button> */}
                {!isKimch && <button onClick={makeColorWhite}>test2</button>}
    
            </Container>
        )
    }



export default DisplayContainer;