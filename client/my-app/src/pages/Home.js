import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './homepage.css';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar"

function Home() {
  const { blogs } = useSelector((state) => state.blogReducer)
  console.log(blogs)


  return (
    <div className="container-fluid">
      {/* <div id="my-navbar" className="row">
        <div className="col-lg-9 col-md-9 col-9">
          <div className="menu row align-items-center">
            <a href="learn.html" className="a_menudesktop">Home</a>
            <a href="blog.html" className="a_menudesktop">Blog</a>
            <div className="search">
              <input placeholder="Search..." className="search-bar" type="text" />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-3 col-3">
          <div className="menu row align-items-center justify-content-end">
            <a href="learn.html" className="a_menudesktop">Log out</a>
            <a href="blog.html" className="a_menudesktop" style={{ marginRight: "0px" }}>Log in</a>
          </div>
        </div>
      </div> */}
      <Navbar />
      <div className="content">
        <div className="judulhalaman">
          Comments
        </div>
        <div className="row">
          <div className="artikelterbarupadding">
            <div className="row">

              <Link className="col-md-6 col-lg-4 col-sm-6" to={`/blog/1`}>
                <div className="listartikel">
                  <a href="cara-mendapatkan-inspirasi-dengan-memaksa-diri-untuk-membuat-design.html">
                    <div className="thumbnailartikel"><img alt="" src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" /></div>
                    <div className="contentsmallartikel">
                      <div className="listartikel_tanggalmenulisartikel">Mei 08, 2022</div>
                      <div className="small_judulartikel">Ide buntu? paksa dirimu untuk membuat design selama 30 menit</div>
                      <div className="small_synopsis">Memaksa diri untuk membuat design selama 30 menit tanpa jeda bisa jadi salah satu cara untuk memancing ide datang.</div>
                    </div>
                  </a>
                </div>
              </Link>

              <div className="col-md-6 col-lg-4 col-sm-6">
                <div className="listartikel">
                  <a href="belajar-ux-writing-tipis-tipis.html">
                    <div className="thumbnailartikel"><img src="blog/thumb_article37.jpg" /></div>
                    <div className="contentsmallartikel">
                      <div className="listartikel_tanggalmenulisartikel">Mei 08, 2022</div>
                      <div className="small_judulartikel">Mari belajar UX Writing tipis tipis</div>
                      <div className="small_synopsis">Belajar UX Writing dari mengamati copy atau tulisan pada judul landing page dari website perusahaan teknologi lalu mencoba menerapkan pada design yang sedang dibuat.</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 col-sm-6">
                <div className="listartikel">
                  <a href="switch-atau-checkbox.html">
                    <div className="thumbnailartikel"><img src="blog/thumb_article29.jpg" /></div>
                    <div className="contentsmallartikel">
                      <div className="listartikel_tanggalmenulisartikel">Maret 25, 2022</div>
                      <div className="small_judulartikel">Kapan menggunakan Switch atau Single Checkbox?</div>
                      <div className="small_synopsis">Kemiripan konsep Switch dan Single Checkbox sering membuat bingung designer untuk menentukan kapan menggunakan nya.</div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 col-sm-6">
                <div className="listartikel">
                  <a href="checklist-handover-file-design-website-ke-developer.html">
                    <div className="thumbnailartikel"><img src="blog/thumb_article17.jpg" /></div>
                    <div className="contentsmallartikel">
                      <div className="listartikel_tanggalmenulisartikel">Januari 02, 2022</div>
                      <div className="small_judulartikel">Yang disiapkan untuk handover file design website ke developer</div>
                      <div className="small_synopsis">UI/UX tidak hanya tentang memudahkan user atau pengguna tapi juga memudahkan rekan kerja seperti developer. Berikut beberapa hal yang bisa membantu mereka.</div>
                    </div>
                  </a>
                </div>
              </div>


              <div className="col-md-6 col-lg-4 col-sm-6">
                <div className="listartikel">
                  <a href="mungkin-yang-kamu-butuhkan-adalah-terjun-ke-industri.html">
                    <div className="thumbnailartikel"><img src="blog/thumb_article30.jpg" /></div>
                    <div className="contentsmallartikel">
                      <div className="listartikel_tanggalmenulisartikel">Maret 27, 2022</div>
                      <div className="small_judulartikel">Mungkin yang kamu butuhkan saat ini bukan lagi latihan tapi terjun ke Industri</div>
                      <div className="small_synopsis"> Berlatih terus menerus membuat design bisa menjadikan seorang yang sedang belajar design terperangkap dalam lingkungan yang ia buat sendiri.</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 col-sm-6">
                <div className="listartikel">
                  <a href="kutipan-para-designer.html">
                    <div className="thumbnailartikel"><img src="blog/thumb_article33.jpg" /></div>
                    <div className="contentsmallartikel">
                      <div className="listartikel_tanggalmenulisartikel">Mei 04, 2022</div>
                      <div className="small_judulartikel">Kutipan designer yang bisa menambah cara pandang                                    </div>
                      <div className="small_synopsis">Beberapa kutipan di artikel ini sangat membantu saya saat membuat design. Membantu berpikir dan mempertimbangkan hal hal yang harus diperhatikan.
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Home;