const changeSal = async () => {
    var sal = document.getElementById("customRange2");
    document.getElementById("salVal").innerHTML = sal.value;

    if(sal == 50000){
        fetchJobs()
    }
    if (sal != 50000) {
        const response = await fetch('jobs.json');
        const jobs = (await response.json()).jobs;
        const colorArray = ["#ffe1cb", "#d5f6ed", "#e2dbf9", "#e0f3ff", "#fbe2f3", "#eceff5"];
        const jobList = document.getElementById("joblist");
        let i = 0;
        jobs.map(job => {
            if (i > colorArray.length - 1) {
                i = 0;
            }

            let salary = job.salary;
            
            if (job.salary == he) {
                let filterHTML = `
                       <div class="card rounded-4 m-2" style="width: 18rem;">
            <div class="card-body p-2">
                <div class="rounded-4 p-2" style="background-color:${colorArray[i]};height:200px;">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="bg-white px-2 rounded-pill m-0">${job.posted_date}</p>
                        <i class="fa-regular fa-bookmark bg-white p-1 rounded"></i>
                    </div>
                    <h6 class="card-title mt-3 mb-0">${job.company}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-text m-0 fw-bold">${job.title}</h5>
                        <img src="${job.company_logo}" alt="${job.company}" style="height:30px;width:30px;" class="rounded-circle">
                    </div>
                    <button class="btn rounded-pill py-1 mt-3 mb-1"
                        style="outline: none; border: 1px solid gray; font-size: 12px;">
                        ${job.category}
                    </button>
                </div>
                <div class="d-flex justify-content-between align-items-center" style="height:auto;">
                    <div>
                        <h6 class="pt-2 px-2 fw-bold m-0">${job.salary}</h6>
                        <p class="text-secondary px-2 pt-0 m-0">${job.location}</p>
                    </div>
                    
                        <button class="btn bg-black text-white rounded-pill py-1" onclick="openDetails(${job.id})">Details</button>
                    
                </div>
            </div>
        </div>
                `
                jobList.innerHTML = filterHTML
                i++
            }
        })
    }
};

async function fetchJobs() {
    const response = await fetch('jobs.json');
    const jobs = (await response.json()).jobs;
    const colorArray = ["#ffe1cb", "#d5f6ed", "#e2dbf9", "#e0f3ff", "#fbe2f3", "#eceff5"];
    const jobList = document.getElementById("joblist");
    let i = 0; // Initialize the counter for colors

    // Generate job cards
    const jobCards = jobs.map(job => {
        // Reset i if it exceeds the color array length
        if (i > colorArray.length - 1) {
            i = 0;
        }

        const cardHtml = `
        <div class="card rounded-4 m-2" style="width: 18rem;" id="card_responsive">
            <div class="card-body p-2">
                <div class="rounded-4 p-2" style="background-color:${colorArray[i]};height:200px;">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="bg-white px-2 rounded-pill m-0">${job.posted_date}</p>
                        <i class="fa-regular fa-bookmark bg-white p-1 rounded"></i>
                    </div>
                    <h6 class="card-title mt-3 mb-0">${job.company}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-text m-0 fw-bold">${job.title}</h5>
                        <img src="${job.company_logo}" alt="${job.company}" style="height:30px;width:30px;" class="rounded-circle">
                    </div>
                    <button class="btn rounded-pill py-1 mt-3 mb-1"
                        style="outline: none; border: 1px solid gray; font-size: 12px;">
                        ${job.category}
                    </button>
                </div>
                <div class="d-flex justify-content-between align-items-center" style="height:auto;">
                    <div>
                        <h6 class="pt-2 px-2 fw-bold m-0">${job.salary}</h6>
                        <p class="text-secondary px-2 pt-0 m-0">${job.location}</p>
                    </div>
                    
                        <button class="btn bg-black text-white rounded-pill py-1" onclick="openDetails(${job.id})">Details</button>
                    
                </div>
            </div>
        </div>
        `;

        // Increment i after each job card creation
        i++;

        return cardHtml;
    }).join('');

    jobList.innerHTML = jobCards; // Update the job list
}

// Call fetchJobs when the window is loaded to ensure DOM elements are ready
window.onload = fetchJobs;


async function openDetails(id) {
    const detailTab = document.getElementById("openDetailCont")
    detailTab.style.display = "inline-block"
    const response = await fetch('jobs.json');
    const jobs = (await response.json()).jobs;
    jobs.map(job => {
        if (job.id == id) {
            const detailHTML = `
            <button class="btn fs-4  position-absolute top-0 end-0 p-3"
                        onclick="document.getElementById('openDetailCont').style.display = 'none'">
                        <i class="fa-solid fa-xmark text-danger"></i>
                </button>
                <img src="${job.company_logo}" alt=""
                        class="rounded-circle border border-4 border-success-subtle" height="50px">
                <h6 class="pt-4"><span class="fw-bold">Company Name</span> : <span>${job.company}</span></h6>
                <h6 class=""><span class="fw-bold">Position</span> : <span>${job.title}</span></h6>
                <h6 class=""><span class="fw-bold">Location</span> : <span>${job.location}</span></h6>
                <h6 class=""><span class="fw-bold">Posted on</span> : <span>${job.posted_date}</span></h6>
                <h6 class=""><span class="fw-bold">Experience</span> : <span>${job.experience}</span></h6>
                <h6 class=""><span class="fw-bold">Salary</span> : <span>${job.salary}</span></h6>
                <h6 class=""><span class="fw-bold">Type</span> : <span class="bg-body-secondary px-2 py-1 rounded-pill"
                                style="font-size: 12px;">${job.type}</span></h6>

                <h5 class="fw-bold pt-2">Details</h5>
                <p>${job.description}</p>
                <a href="${job.apply_link}" target="_blank">
                        <button class="btn btn-success rounded-pill">Apply Now</button>
                </a>
           `
            detailTab.innerHTML = detailHTML
        }
    })
}

async function fetchWithFilters(cat) {
    if(cat == "All"){
        fetchJobs()
    }
    if (cat != "Category" | cat!="All") {
        const response = await fetch('jobs.json');
        const jobs = (await response.json()).jobs;
        const colorArray = ["#ffe1cb", "#d5f6ed", "#e2dbf9", "#e0f3ff", "#fbe2f3", "#eceff5"];
        const jobList = document.getElementById("joblist");
        let i = 0;
        jobs.map(job => {
            if (i > colorArray.length - 1) {
                i = 0;
            }
            
            if (job.category == cat) {
                let filterHTML = `
                       <div class="card rounded-4 m-2" style="width: 18rem;">
            <div class="card-body p-2">
                <div class="rounded-4 p-2" style="background-color:${colorArray[i]};height:200px;">
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="bg-white px-2 rounded-pill m-0">${job.posted_date}</p>
                        <i class="fa-regular fa-bookmark bg-white p-1 rounded"></i>
                    </div>
                    <h6 class="card-title mt-3 mb-0">${job.company}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <h5 class="card-text m-0 fw-bold">${job.title}</h5>
                        <img src="${job.company_logo}" alt="${job.company}" style="height:30px;width:30px;" class="rounded-circle">
                    </div>
                    <button class="btn rounded-pill py-1 mt-3 mb-1"
                        style="outline: none; border: 1px solid gray; font-size: 12px;">
                        ${job.category}
                    </button>
                </div>
                <div class="d-flex justify-content-between align-items-center" style="height:auto;">
                    <div>
                        <h6 class="pt-2 px-2 fw-bold m-0">${job.salary}</h6>
                        <p class="text-secondary px-2 pt-0 m-0">${job.location}</p>
                    </div>
                    
                        <button class="btn bg-black text-white rounded-pill py-1" onclick="openDetails(${job.id})">Details</button>
                    
                </div>
            </div>
        </div>
                `
                jobList.innerHTML = filterHTML
                i++
            }
        })
    }
}

