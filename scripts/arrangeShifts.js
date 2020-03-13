
//每個物件會有一個員工代號與選擇休假日的陣列，休假陣列用 布林值 表示
    const employeeData = [
        //{code: "H", schedule: [1,1,0,0,1,1,1], jobType: 'FT', rank: 'senior'},
        {code: "N", schedule: [1,1,1,1,0,1,1], jobType: 'FT', rank: 'senior'},
        {code: "B", schedule: [0,1,1,1,1,1,0], jobType: 'FT', rank: 'senior'},

        {code: "C", schedule: [1,1,1,1,1,0,1], jobType: 'FT', rank: 'junior'},
        {code: "E", schedule: [1,1,1,1,0,1,0], jobType: 'FT', rank: 'junior'},

        // {code: "P", schedule: [1,0,1,1,0,0,1], jobType: 'PT', rank: 'senior'},
        {code: "M", schedule: [1,1,1,0,1,0,0], jobType: 'PT', rank: 'senior'},
        // {code: "I", schedule: [0,1,1,0,1,1,1], jobType: 'PT', rank: 'senior'},

        {code: "Q", schedule: [0,0,0,0,0,0,1], jobType: 'PT', rank: 'junior'}
    ];

//建立一個新data，將布林值轉換成各員工代號
    const employeeData_InName = employeeData.map(data => {
        schedule_InName = data.schedule.map(e => {return (e === 1 ? data.code : '')});
        return data = {
            code: data.code,
            schedule: schedule_InName,
            jobType: data.jobType,
            rank: data.rank
        }
    });
    console.log('employeeData_InName',employeeData_InName);

// 第三階段的做法，產出可區分 junior or senior 的班表陣列
//此階段在維持架構為一間店的情況下，分析各員工的身份與能力，分為四種：
// 正職奶泡(FT-Senior)
// 正職點單(FT-Junior)
// 工讀奶泡(PT-Senior)
// 工讀點單(PT-Junior)
// 並以奶泡為優先，點單為次要，讓大家都有班

// 將 employeeData_InName 帶入並過濾出一個可區分 junior or senior 的班表陣列
    var week = Array(7);
    shiftTable = week.fill([]).map((x, index) => {
        //過濾出 junior 的班表
        const jun_sum = employeeData_InName
            .filter(x => x.rank === "junior")
            .reduce((sum, employ) => sum += employ.schedule[index]
            , '');
        //過濾出 senior 的班表
        const sen_sum = employeeData_InName
            .filter(x => x.rank === "senior")
            .reduce((sum, employ) => {
                return sum += employ.schedule[index]
        }, '')
        return [sen_sum, jun_sum];
    })
    console.log("shiftTable", shiftTable);

// 在空空的<tr>中放入我要放的<th>跟<td>*7
    const tr = document.querySelectorAll('tbody tr');
    tr.forEach(tr => {
        var insideTr = [];
        insideTr.push('<th scope="row"></th>');
        for(i=0;i<7;i++) {
            insideTr.push('<td></td>')
        };
        insideTr = insideTr.join('')
        tr.innerHTML = insideTr;
        }
    );

// 將 shiftTable 大陣列中的正職班表放入DOM表單
    const ftTitle = document.querySelector('.ftlist th');
    ftTitle.innerHTML = '壓粉奶泡手';
    const ftList = document.querySelectorAll('.ftlist td');
    ftList.forEach((e,index) => {
        e.innerHTML = shiftTable[index][0];
    });

// 將 shiftTable 大陣列中的ＰＴ班表放入DOM表單
    const ptTitle = document.querySelector('.ptlist th');
    ptTitle.innerHTML = '點單備料員';
    const ptList = document.querySelectorAll('.ptlist td');
    ptList.forEach((e,index) => {
        e.innerHTML = shiftTable[index][1];
    });


const allList = document.querySelectorAll('td');
allList.forEach(e => {
    if(e.innerText.includes('N')) {
        console.log(e.innerText);
        e.style.backgroundColor = 'red';
    }
});

