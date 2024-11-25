function PostCard(props){
    return(
        <>
        <div className="card">
          <div className="card-header text-center">
            <h5 className="card-title">{props.value.title}</h5>
          </div>
          <div className="card-body">
            <div className="blog-media">
              <img src="/assets/imgs/blog-6.jpg" alt="" className="w-100" />
            </div>
            <p className="my-3" dangerouslySetInnerHTML={{__html: props.value.content}}>
            
            </p>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center flex-basis-0">
            <button className="btn btn-primary circle-35 mr-4">
              <i className="ti-back-right" />
            </button>
            <a href={"/singlepost/"+props.value._id} className="btn btn-outline-dark btn-sm">
              READ MORE
            </a>
            <a href="#" className="text-dark small text-muted">
              By : YUZURIHA
            </a>
          </div>
        </div>
        <hr />
        </>
    )
}

export default PostCard;