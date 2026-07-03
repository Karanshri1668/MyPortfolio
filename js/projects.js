function renderSkeleton(){

const grid=document.getElementById("projectsGrid");

grid.innerHTML="";

for(let i=0;i<6;i++){

grid.innerHTML+=`

<div class="skeleton-card">

</div>

`;

}

}