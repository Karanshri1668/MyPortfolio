const USERNAME = "karanshri1668";

const API = `https://api.github.com/users/${USERNAME}/repos?per_page=100`;

let allProjects = [];
let visibleProjects = 6;
let currentFilter = "all";
let currentSearch = "";
let currentSort = "updated";
const FEATURED_PROJECT = "KIXORA";

// ======================
// FETCH REPOSITORIES
// ======================

async function fetchRepositories() {

    try {

        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("GitHub API Error");
        }

        const repos = await response.json();

        // Remove forks
        return repos.filter(repo => !repo.fork);

    } catch (error) {

        console.error(error);

        return [];

    }

}

// ======================
// DETECT TECHNOLOGIES
// ======================

function detectTech(repo) {

    const tech = [];

    const topics = repo.topics || [];

    const text = (

        (repo.description || "") +

        " " +

        repo.name +

        " " +

        topics.join(" ")

    ).toLowerCase();

    if (text.includes("html")) tech.push("HTML");

    if (text.includes("css")) tech.push("CSS");

    if (text.includes("javascript")) tech.push("JavaScript");

    if (text.includes("node")) tech.push("Node");

    if (text.includes("express")) tech.push("Express");

    if (text.includes("mongodb")) tech.push("MongoDB");

    if (text.includes("three")) tech.push("Three.js");

    if (text.includes("gsap")) tech.push("GSAP");

    return tech;

}

// ======================
// FORMAT REPO NAME
// ======================

function formatTitle(name) {

    return name

        .replace(/-/g, " ")

        .replace(/\b\w/g, letter => letter.toUpperCase());

}

// ======================
// PROJECT CARD
// ======================

// function projectCard(project) {

//     const tech = project.tech || [];

//     return `

//     <div class="project-card">

//         <div class="project-content">

//             <h3>${formatTitle(project.name)}</h3>

//             <p>

//                 ${project.description || "No description available."}

//             </p>

//             <div class="badges">

//                 ${tech.map(item => `<span>${item}</span>`).join("")}

//             </div>

//             <div class="project-buttons">

//                 <a href="${project.html_url}" target="_blank">

//                     GitHub

//                 </a>

//                 ${project.homepage ?

//                 `<a href="${project.homepage}" target="_blank">

//                     Live Demo

//                 </a>`

//                 : ""}

//             </div>

//         </div>

//     </div>

//     `;

// }

function projectCard(project) {

    const tech = project.tech || [];

    const updated = new Date(project.updated_at).toLocaleDateString();

    return `

    <article class="project-card">

        <span class="project-type">

            ${project.language || "Project"}

        </span>

        <h3>

            ${formatTitle(project.name)}

        </h3>

        <p>

            ${project.description || "No description available."}

        </p>

        <div class="badges">

            ${tech.map(item => `<span>${item}</span>`).join("")}

        </div>

        <div class="project-footer">

            <small>

                Updated ${updated}

            </small>

            <div class="project-links">

                <a href="${project.html_url}" target="_blank">

                    Github

                </a>

                ${project.homepage ?

                `<a href="${project.homepage}" target="_blank">

                    Live →

                </a>`

                : ""}

            </div>

        </div>

    </article>

    `;

}

function getFilteredProjects(){

    let projects = [...allProjects];

    // SEARCH

    if(currentSearch){

        projects = projects.filter(project=>{

            return (

                project.name

                .toLowerCase()

                .includes(currentSearch)

                ||

                (project.description || "")

                .toLowerCase()

                .includes(currentSearch)

            );

        });

    }

    // FILTER

    if(currentFilter !== "all"){

        projects = projects.filter(project=>

            project.tech.includes(currentFilter)

        );

    }

    // SORT

    switch(currentSort){

        case "updated":

            projects.sort(

                (a,b)=>

                new Date(b.updated_at)

                -

                new Date(a.updated_at)

            );

        break;

        case "new":

            projects.sort(

                (a,b)=>

                new Date(b.created_at)

                -

                new Date(a.created_at)

            );

        break;

        case "old":

            projects.sort(

                (a,b)=>

                new Date(a.created_at)

                -

                new Date(b.created_at)

            );

        break;

        case "stars":

            projects.sort(

                (a,b)=>

                b.stargazers_count

                -

                a.stargazers_count

            );

        break;

    }

    return projects;

}

// ======================
// RENDER PROJECTS
// ======================

function renderProjects() {

    const grid = document.getElementById("projectsGrid");

    const projects = getFilteredProjects();

    grid.innerHTML = "";

    if (projects.length === 0) {

        grid.innerHTML = `
            <div class="empty-state">
                <h2>😕 No Projects Found</h2>
                <p>Try another search or filter.</p>
            </div>
        `;

        return;
    }

    projects
        .slice(0, visibleProjects)
        .forEach(project => {

            grid.innerHTML += projectCard(project);

        });

    updateLoadMoreButton(projects.length);

}



// ======================
// LOAD MORE BUTTON
// ======================


function updateLoadMoreButton(total){

    const btn=document.getElementById("loadMoreBtn");

    if(!btn)return;

    btn.style.display=

    visibleProjects>=total ?

    "none"

    :

    "inline-flex";

}

function loadMoreProjects() {

    visibleProjects += 6;

    renderProjects();

}

// ======================
// INIT
// ======================

async function initProjects() {

    renderSkeleton();

    const repos = await fetchRepositories();

    repos.forEach(repo => {

        repo.tech = detectTech(repo);

    });

    allProjects = repos;
    // renderFeatured(allProjects[0]);
    const featuredProject = allProjects.find(
    project => project.name.toLowerCase() === FEATURED_PROJECT.toLowerCase()
);

renderFeatured(featuredProject || allProjects[0]);

    renderProjects();

}

initProjects();

document.getElementById("loadMoreBtn").addEventListener("click", loadMoreProjects);

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.onclick = () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        visibleProjects = 6;

        renderProjects();

    };

});

const sort = document.getElementById("sortProjects");

sort.addEventListener("change", (e) => {

    currentSort = e.target.value;

    visibleProjects = 6;

    renderProjects();

});


const search = document.getElementById("projectSearch");

search.addEventListener("input", (e) => {

    currentSearch = e.target.value.toLowerCase();

    visibleProjects = 6;

    renderProjects();

});

function renderFeatured(project){

    if(!project) return;

    const container =
    document.getElementById("featuredProject");

    container.innerHTML = `

    <section class="featured-project">

        <div class="featured-left">

            <span class="featured-tag">

                ⭐ Featured Project

            </span>

            <h2>

                ${formatTitle(project.name)}

            </h2>

            <p>

                ${project.description ||
                "No description available."}

            </p>

            <div class="badges">

                ${project.tech
                .map(item=>`<span>${item}</span>`)
                .join("")}

            </div>

            <div class="featured-buttons">

                <a
                href="${project.html_url}"
                target="_blank">

                GitHub

                </a>

                ${project.homepage ?

                `<a
                href="${project.homepage}"
                target="_blank">

                Live Demo

                </a>`

                : ""}

            </div>

        </div>

        <div class="featured-right">

            <div class="project-icon">

                💻

            </div>

        </div>

    </section>

    `;

}


