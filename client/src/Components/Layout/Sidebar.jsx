function Sidebar(){
    return(
        <>
        <div className="page-sidebar text-center">
        <h6 className="sidebar-title section-title mb-4 mt-3">About</h6>
        <img src="/assets/imgs/avatar.jpg" alt="" className="circle-100 mb-3" />
        <div className="socials mb-3 mt-2">
          <a href="https://www.facebook.com/profile.php?id=100092349596500">
            <i className="ti-facebook" />
          </a>
          <a href="https://www.instagram.com/yuzuriha_1206/">
            <i className="ti-instagram" />
          </a>
          <a href="https://www.youtube.com/@ThanhNguyen-ds1fc">
            <i className="ti-youtube" />
          </a>
        </div>
        <p>
          Tao la hacker van thanh, hacker so 1 chien thang
        </p>
      </div>
        </>
    )
}

export default Sidebar;