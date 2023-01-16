/* eslint-disable */ 
import './App.css';
import {useState} from 'react'

function App() {

  let [post, fnName] = useState([ "리액트 독학!", '감기 걸린거 같음', '오브젝트는 왜 안되나요' ]);

  let [like, fnLike] = useState([ 0, 0, 0 ]);

  const postSort = function(){
    let copy = [...post];
    return copy.sort();
  }

  let [modal, setModal] = useState(false)
  const likeUpdate = (i) => {
    let copy = [...like]
    copy[i] = copy[i] + 1
    return copy
  }

  return (
    <div className="App">
      <header className="header">
        <h4>Blog</h4>
      </header>
      <div className="Btn">
        <button onClick={()=>{fnName(postSort())}}>정렬하기</button>
      </div>
      { // list
        post.map((item, i)=>{
          return (
            <div className="list" key={i}>
            <h4 onClick={() => { setModal(!modal) }}>{item}</h4>
            <p>2023-01-16 
              <span style={{cursor:'pointer'}} onClick={()=>{ fnLike( likeUpdate(i) )}}> ❤️ </span>
              <b>{like[i]}</b>
            </p>
          </div>
          )
        })
      }

      {                    // 작명
        modal == true? <Modal post={post}/> : null
      }
    </div>
  );
}


const Modal = (props) => {

  return (
    <div className="modal">
      <h4>{props.post[0]}</h4>
      <p>Date</p>
      <p>Detail text</p>
    </div>
  )
}

export default App;
