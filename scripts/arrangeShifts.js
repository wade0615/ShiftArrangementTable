// 第二階段的做法，用陣列將整放資料包起來，再不斷用 .map 重整與建立新資料

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

    // 取出含有各員工代號的休假日陣列
        // const employeeSchedule = employeeData_InName.map(e => {
        //     return e.schedule;
        // });

    //生成班表
        // ShiftTable = [];
        // ShiftTable = makeShiftTable(employeeSchedule);
        // // console.log(ShiftTable);
        // console.table(ShiftTable);

// 第三階段的做法，employeeData不一起處理，先分出能力是 Senior 還是 junior，生出個別班表，再合併成一個
//此階段在維持架構為一間店的情況下，分析各員工的身份與能力，分為四種：
// 正職奶泡(FT-Senior)
// 正職點單(FT-Junior)
// 工讀奶泡(PT-Senior)
// 工讀點單(PT-Junior)
// 並以奶泡為優先，點單為次要，讓大家都有班

    // 過濾出 senior 的員工，取出 senior 的班表
        // const seniorEmployeeSchedule = employeeData_InName
        //     .filter(e => e.rank === 'senior')
        //     .map(e => e.schedule);
        // seniorShiftTable = makeShiftTable(seniorEmployeeSchedule);

    // 過濾出 junior 的員工，取出 junior 的班表
        // const juniorEmployeeSchedule = employeeData_InName
        //     .filter(e => e.rank === 'junior')
        //     .map(e => e.schedule);
        // juniorShiftTable = makeShiftTable(juniorEmployeeSchedule);

    //依照日期顯示各日可上班的員工
        // function makeShiftTable(e){
        //     shiftTable = [];
        //     for(i=0; i<7; i++) {
        //         // ShiftTable[i] = e[0][i] + e[1][i] + e[2][i];
        //         employees = [];
        //         for(cont=0; cont < e.length; cont++) {
        //             employees[cont] = e[cont][i];
        //             // console.log(employees);
        //         }
        //         shiftTable[i] = employees.join('');
        //     };
        //     return shiftTable;
        // };

    // 將 senior 跟 junior 的班表合併，生成可區分 FT 還是 PT 的總班表大陣列
        // function makeNewShiftTable(senior, junior) {
        //     var NST = Array(7).fill([]);
        //     NST = NST.map((e, index) => [senior[index], junior[index]]);
        //     return NST;
        // };
        
        // var NewShiftTable = [];
        // NewShiftTable = makeNewShiftTable(seniorShiftTable, juniorShiftTable);
        // console.log('NewShiftTable',NewShiftTable);

        var week = Array(7);
        NewShiftTable = week.fill([]).map((x, index) => {
        
            const jun_sum = employeeData_InName
                .filter(x => x.rank === "junior")
                .reduce((sum, employ) => sum += employ.schedule[index]
                , '');
        
            const sen_sum = employeeData_InName
                .filter(x => x.rank === "senior")
                .reduce((sum, employ) => {
                    return sum += employ.schedule[index]
            }, '')
            return [sen_sum, jun_sum]
        
        })
        console.log("NewShiftTable", NewShiftTable);

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

// 將 NewShiftTable 大陣列中的正職班表放入DOM表單
    const ftTitle = document.querySelector('.ftlist th');

    (function test(){
        ftTitle.innerHTML = '壓粉奶泡手';
        const ftList = document.querySelectorAll('.ftlist td');
        console.log("ftList", ftList)
        ftList.forEach((e,index) => {
            e.innerHTML = NewShiftTable[index][0];
        });
    })();

// 將 NewShiftTable 大陣列中的ＰＴ班表放入DOM表單
    const ptTitle = document.querySelector('.ptlist th');
    ptTitle.innerHTML = '點單備料員';
    const ptList = document.querySelectorAll('.ptlist td');
    console.log("ptList", ptList)
    ptList.forEach((e,index) => {
        e.innerHTML = NewShiftTable[index][1];
    });


const allList = document.querySelectorAll('td');
console.log("allList", allList);
allList.forEach(e => {
    if(e.innerText.includes('N')) {
        console.log(e.innerText);
        e.style.backgroundColor = 'red';
    }
});

// Chirs開示
    // week.map((x, index) => {
    //     const jun_sum = employeeData
    //         .filter(x => x.rank === "junior")
    //         .reduce((sum, employ) => {
    //             sum = sum + employ.schedule[index]
    //     }, 0)
    //     const sen_sum = employeeData
    //         .filter(x => x.rank === "senior")
    //         .reduce((sum, employ) => {
    //             sum += employ.schedule[index]
    //     }, 0)
    //     return [jun_sum, sen_sum]
    // })

// 發現新世界並引用
    // var week = Array(7);
    // NewShiftTable = week.fill([]).map((x, index) => {

    //     const jun_sum = employeeData_InName
    //         .filter(x => x.rank === "junior")
    //         .reduce((sum, employ) => sum += employ.schedule[index]
    //         , '');

    //     const sen_sum = employeeData_InName
    //         .filter(x => x.rank === "senior")
    //         .reduce((sum, employ) => {
    //             return sum += employ.schedule[index]
    //     }, '')
    //     return [jun_sum, sen_sum]

    // })
    // console.log("NewShiftTable2", NewShiftTable);
