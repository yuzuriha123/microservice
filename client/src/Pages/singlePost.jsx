import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SinglePost() {
const id = useParams().id
const [data,setdata] =useState({
  id:"",
  title:"",
  content:""
})

const getPosts = useCallback(async () => {
  try {
    const response = await fetch(`http://localhost:4000/post/${id}`);
    const data = await response.json();
    setdata(data.post);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}, []);
useEffect(() => {
  getPosts();
}, [getPosts]);

const [comment, setcomment] = useState([]);

  const getcomment = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:4001/post/${id}/comment`);
      const data = await response.json();
      setcomment(data.comments);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    getcomment();
  }, [getcomment]);


  const [textInput, setTextInput] = useState({
    name: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setTextInput((preValue) => {
      return { ...preValue, [name]: value };
    });
    
  }
  async function handleClick(event){
    event.preventDefault();
    try{
        const response =await fetch(`http://localhost:4001/post/${id}/comment`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(textInput)
        })
        const res = await response.json();
            console.log(res);
            if(res.status==='ok'){
              getcomment();
              setTextInput({
                name:"",
                content:""
              })
            }

       

    }
    catch(e){
        console.log(e)

    }
  }

  

  






  return (
    <>
<section className="container">
  <div className="page-container">
    <div className="page-content">
      <div className="card">
        <div className="card-header pt-0">
          <h3 className="card-title mb-4">{data.title}</h3>
          <small className="small text-muted">
            <a href="#" className="text-muted">
              BY YUZURIHA
            </a>
          </small>
        </div>
        <div className="card-body border-top" dangerouslySetInnerHTML={{__html: data.content}}>

        </div>
        <div className="card-footer">
          <h6 className="mt-5 mb-3 text-center">
          </h6>
          <hr />
          {comment.map((value, index)=>{
            return(
              <div className="media mt-5">
                                <img
                                src="/assets/imgs/avatar-2.jpg"
                                className="mr-3 thumb-sm rounded-circle"
                                alt="..."
                                />
                                <div className="media-body">
                                    <h6 className="mt-0">{value.name}</h6>
                                    <p>
                                      {value.content}
                                    </p>
                                </div>
                            </div>
            )
          })

          }
          <h6 className="mt-5 mb-3 text-center">
            <a href="#" className="text-dark">
              Write Your Comment
            </a>
          </h6>
          <hr />
          <form>
            <div className="form-row">
              <div className="col-12 form-group">
                <textarea
                  name="content"
                  id="content"
                  value={textInput.content}
                  cols={30}
                  rows={10}
                  className="form-control"
                  placeholder="Enter Your Comment Here"
                  onChange={handleChange}
                  defaultValue={""}
                />
              </div>
              <div className="col-12 form-group">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={textInput.name}
                  onChange={handleChange}
                  placeholder="your_name"
                />
              </div>
              <div className="form-group col-12">
                <button onClick={handleClick} className="btn btn-primary btn-block">
                  Post Comment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
}

export default SinglePost;