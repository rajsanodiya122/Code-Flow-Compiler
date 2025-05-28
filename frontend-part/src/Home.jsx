import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold animate__animated animate__fadeInDown" href="#">CodeFlow</a>
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container my-5 py-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start" data-aos="fade-right">
            <h1 className="fw-bold text-dark mb-3 animate__animated animate__fadeInUp">Welcome to <span className="text-primary">CodeFlow</span></h1>
            <p className="lead mb-4">Compile Java, Python, C++ and more with ease. Learn coding, ace interviews, and grow your skills.</p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="/login" className="btn btn-primary px-4 btn-lg animate__animated animate__pulse animate__infinite">Login</a>
              <a href="/signup" className="btn btn-outline-primary px-4 btn-lg">Signup</a>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center gap-4 mt-5 mt-md-0" data-aos="zoom-in">
            <img src="https://cdn-icons-png.flaticon.com/512/226/226777.png" alt="Java" style={{ maxWidth: '80px' }} />
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968350.png" alt="Python" style={{ maxWidth: '80px' }} />
            <img src="https://cdn-icons-png.flaticon.com/512/6132/6132222.png" alt="C++" style={{ maxWidth: '80px' }} />
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="bg-light py-5">
        <div className="container text-center" data-aos="fade-up">
          <h2 className="text-primary mb-4">About CodeFlow</h2>
          <p className="fs-5">CodeFlow is your all-in-one platform to compile, learn and test code in real-time. Built for students, developers, and interview aspirants.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container text-center" data-aos="fade-up">
          <h2 className="text-primary mb-4">Contact Us</h2>
          <p className="fs-5">
            For queries or support, email us at <a href="mailto:support@codeflow.com">support@codeflow.com</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        &copy; {new Date().getFullYear()} CodeFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

