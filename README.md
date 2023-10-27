<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->


<!-- PROJECT LOGO -->
<!--
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">project_title</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</div>
-->



<!-- TABLE OF CONTENTS -->
## Table Of Contents
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#Project-Structure">Project Structure</a></li>
      </ul>
    </li>
      <li><a href="#Contributors">Contributors</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    
  <!--  <li><a href="#roadmap">Roadmap</a></li> -->




<!-- ABOUT THE PROJECT -->
<div name="about-the-project">
  
## About The Project

Welcome to our Project – your all-in-one solution for ensuring the quality and performance of your Twitter clone app. In this repository, we employ cutting-edge testing methodologies and tools to conduct end-to-end testing of web and mobile applications, along with intense stress testing for your Twitter clone app.

### Key Features

- **End-to-End Testing:** We utilize Cypress for web and Appium for mobile applications to comprehensively assess your app's functionality, usability, and compatibility across various platforms and browsers.

- **Stress Testing:** Our stress testing, powered by JMeter, evaluates your app's resilience under extreme loads, simulating a multitude of concurrent users, interactions, and data transfers.

### Why do you need us?

- 🚀 **Seamless Performance**: Ensure that our Twitter clone app performs flawlessly under real-world conditions.
  
- 🧐 **In-Depth Insights**: Gain valuable insights into your application's functionality, user experience, and performance.

- 🛡️ **Robust Security**: Identify vulnerabilities and optimize our app's efficiency and reliability.
</div>


### Built With

* [![Cypress][Cypress-logo]][Cypress-url]
* [![Appium][Appium-logo]][Appium-url]
* [![Jmeter][Jmeter-logo]][Jmeter-url]


## Project Structure 

### Web testing Structure
![WhatsApp Image 2023-10-27 at 03 59 30](https://github.com/Twitter-Clone-Project/Testing/assets/97397431/a067ac6b-8c44-4587-99d1-2b90fbf90b84)

### Mobile Testing Structure
![WhatsApp Image 2023-10-27 at 03 45 04](https://github.com/Twitter-Clone-Project/Testing/assets/97397431/97cbaf6a-aa16-4826-b169-7d4c82ee10f6)

### Stress Testing Structure
![WhatsApp Image 2023-10-27 at 04 10 20](https://github.com/Twitter-Clone-Project/Testing/assets/97397431/5b9cc217-c17e-42fe-b623-d88117ef5de5)


## Contributors

<table>
  <tr>
    <td align="center">
    </td>
        <td align="center">
    <a href="https://github.com/mennamohamed0207" target="_black">
    <img src="https://avatars.githubusercontent.com/u/90017398?v=4" width="150px;" alt="Menna Mohamed"/>
    <br />
    <sub><b>Menna Mohamed</b></sub></a>
    </td>
    <td align="center">
    <td align="center">
    <a href="https://github.com/RawanMostafa08" target="_black">
    <img src="https://avatars.githubusercontent.com/u/97397431?v=4" width="150px;" alt="Rawan Mostafa"/>
    <br />
    <sub><b>Rawan Mostafa</b></sub></a>
    </td> 
  </tr>
 </table>

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
#### Cypress
* npm
  ```sh
  npm install -g cypress@9
  ```
* npx
  ```sh
  npx cypress open
  ```

#### Appium 
* Install appium with node.js
  ```sh
   npm install -g appium
  ```
* Check if appium is installed
  ```sh
    appium -v
  ```
  ```sh
    where appium
  ```
  
* Start appium
   ```sh
    appium
  ```

#### JMeter
* Check java is installed on your system
  ```sh
               java -version
  ```
* Download Jmeter from internet  https://jmeter.apache.org/download_jmeter.cgi

* Unzip and keep Jmeter folder at any location

* Start Jmeter (Windows):
  Navigate to the directory that has jmeter.bat file
  ```sh
      jmeter.bat
  ```
             
  * Start Jmeter (Mac):
  Navigate to the directory that has jmeter.sh file
  ```sh
      sh jmeter.sh 
  ```

  ### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Twitter-Clone-Project/Testing
   ```
2. Install NPM packages
   ```sh
   npm install
   ```



<!-- ROADMAP -->
<!--
## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).
-->


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!--
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
-->
[Cypress-url]:https://www.cypress.io/
[Cypress-logo]:https://img.shields.io/badge/Cypress-20232A?style=for-the-badge&logo=cypress&logoColor=61DAFB
[Appium-url]:https://appium.io/docs/en/2.1/
[Appium-logo]:https://img.shields.io/badge/Appium-20232A?style=for-the-badge&logo=appium&logoColor=FF3E00
[Jmeter-url]:https://jmeter.apache.org/
[Jmeter-logo]:https://img.shields.io/badge/Jmeter-20232A?style=for-the-badge&logo=jmeter&logoColor=4FC08D
