import { useEffect, useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Post() {

  const navigate = useNavigate()
  const authentoken = useCallback(async () => {
    try {
      const token=localStorage.getItem("token")
      const response = await fetch("http://localhost:4003/authen_token",{ method:'POST',
        headers:{
            'Authorization':token
        }});
      
      const data = await response.json();
      console.log(data)
      if(!data.success)(
        navigate("/login")
      )
    } catch (e) {
      navigate("/login")
       console.log(e);
    }
  }, []);
  useEffect(() => {
    authentoken();
  }, [authentoken]);


  const [textInput, setTextInput] = useState({
    title: "",
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
      const token=localStorage.getItem("token")
        const response =await fetch('http://localhost:4000/post',{
            method:'POST',
            headers:{
                'Authorization':token,
                'Content-type':'application/json'
            },
            body:JSON.stringify(textInput)
        })
        const data= await response.json();
        console.log(data)

    }
    catch(e){
        console.log(e)

    }
  }


  return (
    <>
      <div className="container">
        <h3>Inputs</h3>
        <hr />
        <div className="row mt-5">
          <div className="col-md-12">
            <h6 className="section-secondary-title">Title</h6>
            <div className="form-group">
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Title"
                name="title"
                value={textInput.title}
                onChange={handleChange}
              />
            </div>
            <h6 className="section-secondary-title">Content</h6>
            <div class="form-group">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                placeholder="Content"
                name="content"
                onChange={handleChange}
              >
                {textInput.content}
              </textarea>
            </div>
            <button className="btn btn-danger" onClick={handleClick}>Post</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
