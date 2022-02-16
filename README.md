<div id="top"></div>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://passx.cuodex.net">
    <img src="https://passx.cuodex.net/assets/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">PassX - Webinterface</h3>

  <p align="center">
    A safe place for your passwords!
    <br />
    <a href="https://passx.cuodex.net"><strong>Go to the Webinterface »</strong></a>
    <br />
    <br />
    <a href="https://cuodex.net/passx">View Website</a>
    ·
    <a href="https://cuodex.net/contact#reportBug">Report Bug</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
<img src="https://passx.cuodex.net/assets/ui.png" width="100%">

A lot of password managers exist out there, but we wanted to create our own one. Open Source, Safe, Anonym & Simple.

<!-- IMPLEMENTATION -->
## Implementation

<h3>Front End</h3>

To create a unique and simple design, we used simple html & css, created our own icons and images and used a few from the <a href="https://fontawesome.com">Fontawesome Libary</a>

<h3>Back End</h3>
Now the magic happens in the back end. The only way to make it possible, that the password is only stored in the current browser session, was to use javascript. So all content is now loaded with javascript methods, which communicates with our database connection over the ajax function from <a href="https://jquery.com/">JQuery</a>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ENCRYPTION -->
## Encryption

Of course our webinterface communicates via ssl encryption with our database connection, to prevent man in the middle attacks.
In order to make end-to-end encryption possible, we searched for a way to en- and decrypt all password entries, so they aren't saved in plain text in our database.

The only option we found to use end-to-end encryption, but also keep the webinterface user friendly, was to use the users password as encryption key.

So now everytime the user communicates with the database connection, all sensitive data (for example title, password, username, etc.) gets encrypted with the given password over 256-AES.

Of course we cannot save the password anywhere on the server, otherwise this system wouldn't make sense. So the password the user entered only stays on the clients side and gets deleted if you reload the page.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

CuodeX - [Website](https://cuodex.net) - info@cuodex.net

Project Website: [https://cuodex.net/passx](https://cuodex.net/passx)

Project Link: [https://github.com/CuodeX/PassX-Webclient](https://github.com/CuodeX/PassX-Webclient)

<p align="right">(<a href="#top">back to top</a>)</p>

