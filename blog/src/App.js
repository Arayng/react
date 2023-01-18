/* eslint-disable */ 
import './App.css';
import {useState} from 'react'

function App() {

  let [post, setPost] = useState([ "리액트 독학!", '감기 걸린거 같음', '오브젝트는 왜 안되나요' ]);
  let [like, fnLike] = useState([ 0, 0, 0 ]);

  const postSort = function(){
    // 정렬하기
    let copy = [...post];
    return copy.sort();
  }

  const cSetPost = (i) => {
    // index를 하위component에서 받아오는 방법에 대해 고민해보기
    let copy = [...post];
    console.log(i);
    copy[0] = "리액트 독학 중입니다. ❤️";
    return setPost(copy);
  }

  const addPost = i => {
    let copy = [...post];
    copy.unshift(i)
    setPost(copy)
  }

  const delPost = (i) => {
    let copy = [...post];
    copy.splice(i,1)
    setPost(copy)
  }

  const likeUpdate = (i) => {
    // 좋아요 갯수 추가하기
    let copy = [...like];
    copy[i] = copy[i] + 1;
    return copy;
  }

  let [modal, setModal] = useState(false);
  let [postNum, setPostNum] = useState(0); // modal 제목에 표시하기 위해서 구하는 state

  const modalToggle = (i) => {
    // modal 닫혀있는데 누르면 modal=true해야함
    // modal 열려있는데 누르면 modal=false해야하는데 i가 postNum이랑 같으면 modal=false를 해야함
    // 근데 i가 postNum이랑 다르면 modal=true유지해야함
    if(modal){
        if(i==postNum) setModal(false)
    } else {
      setModal(true)
    }
  }
  
  // input 제어 공부
  let [iValue, setiValue] = useState('')
  return (
    <div className="App">
      <header className="header">
        <h4>Blog</h4>
      </header>
      <div className="Btn">
        <button onClick={()=>{setPost(postSort())}}>정렬하기</button>
      </div>
      { // list
        post.map((item, i)=>{
          return (
            <div className="list" key={i}>
              <div>
              <h4 onClick={() => { modalToggle(i), setPostNum(i) }}>{item}</h4>
              <p>2023-01-16 
                <span style={{cursor:'pointer'}} onClick={()=>{ fnLike( likeUpdate(i) )}}> ❤️ </span>
                <b>{like[i]}</b>
              </p>
              </div>
              <div style={{lineHeight:'100px'}}>
                <button className='cssBtn' onClick={ () => delPost(i) }>삭제하기</button>                
              </div>
            </div>
          )
        })
      }
      <input type="text" className='inputBox' placeholder='Input Text' onChange={(e)=>{setiValue(e.target.value)}}/>
      <button className='cssBtn' onClick={()=>{ addPost(iValue) }}>추가하기</button>
      {                    // 작명
        modal == true? <Modal post={post} cSetPost={cSetPost} postNum={postNum} /> : null
      }
    </div>
  );
}


const Modal = (props) => {

  return (
    <div className="modal">
      <h4>{props.post[props.postNum]}</h4>
      <p>Date</p>
      <p>Detail text</p>
      <button onClick={props.cSetPost}>Change Post</button>
    </div>
  )
}

export default App;
