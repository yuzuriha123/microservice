function Navbar(){
    return (
    <>
    {/* page First Navigation */}
  <nav className="navbar navbar-light bg-light">
    <div className="container">
      <a className="navbar-brand" href="#">
        <img src="/assets/imgs/logo.svg" alt="" />
      </a>
      <div className="socials">
        <a href="javascript:void(0)">
          <i className="ti-facebook" />
        </a>
        <a href="javascript:void(0)">
          <i className="ti-twitter" />
        </a>
        <a href="javascript:void(0)">
          <i className="ti-pinterest-alt" />
        </a>
        <a href="javascript:void(0)">
          <i className="ti-instagram" />
        </a>
        <a href="javascript:void(0)">
          <i className="ti-youtube" />
        </a>
      </div>
    </div>
  </nav>
  {/* End Of First Navigation */}
  {/* Page Second Navigation */}
  <nav className="navbar custom-navbar navbar-expand-md navbar-light bg-primary sticky-top">
    <div className="container">
      <button
        className="navbar-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
        </ul>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <a href="components.html" className="ml-4 btn btn-dark mt-1 btn-sm">
              Components
            </a>
          </li>
        </div>
      </div>
    </div>
  </nav>
  {/* End Of Page Second Navigation */}
  {/* page-header */}

    </>
    )
}

export default Navbar;