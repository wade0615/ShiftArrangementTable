
//每個物件會有一個員工代號與選擇休假日的陣列，休假陣列用 布林值 表示
    const employeeData = [
        //{code: "H", schedule: [1,1,0,0,1,1,1], jobType: 'FT', rank: 'senior'},
        {code: "N", schedule: [1,1,1,1,0,1,1], jobType: 'FT', rank: 'senior'},
        {code: "B", schedule: [0,1,1,1,1,1,0], jobType: 'FT', rank: 'senior'},

        {code: "C", schedule: [1,1,1,1,1,0,1], jobType: 'FT', rank: 'junior'},
        {code: "E", schedule: [1,1,1,1,0,1,0], jobType: 'FT', rank: 'junior'},

        {code: "P", schedule: [1,0,1,1,0,0,1], jobType: 'PT', rank: 'senior'},
        {code: "M", schedule: [1,1,1,0,1,0,0], jobType: 'PT', rank: 'senior'},
        {code: "I", schedule: [0,1,1,0,1,1,1], jobType: 'PT', rank: 'senior'},

        {code: "Q", schedule: [0,0,0,0,0,0,1], jobType: 'PT', rank: 'junior'}
    ];
    
// 主程式：
    makeShiftTable (employeeData);
    function makeShiftTable (employeeData){
        const employeeData_InName = employeeData_ToName(employeeData);
        const shiftTable = SeparateRanks(employeeData_InName);
        createListElement();
        console.log(shiftTable);
        createSeniorShiftTable(shiftTable);
        createJuniorShiftTable(shiftTable);
        SeparateJobType(employeeData);
    };

//建立一個新data，將布林值轉換成各員工代號
    function employeeData_ToName (employeeData) {
        return employeeData.map(data => {
            schedule_InName = data.schedule.map(e => {return (e === 1 ? data.code : '')});
            return data = {
                code: data.code,
                schedule: schedule_InName,
                jobType: data.jobType,
                rank: data.rank
            }
        });
    };

// 第三階段的做法，產出可區分 junior or senior 的班表陣列
//此階段在維持架構為一間店的情況下，分析各員工的身份與能力，分為四種：
// 正職奶泡(FT-Senior)
// 正職點單(FT-Junior)
// 工讀奶泡(PT-Senior)
// 工讀點單(PT-Junior)
// 並以奶泡為優先，點單為次要，讓大家都有班

// 將 employeeData_InName 帶入並過濾出一個可區分 junior or senior 的班表陣列
    function SeparateRanks (employeeData_InName){
        var week = Array(7);
        return week.fill([]).map((x, index) => {
            //過濾出 junior 的班表
            const jun_sum = employeeData_InName
                .filter(x => x.rank === "junior")
                .reduce((sum, employ) => sum += employ.schedule[index]
                , '');
            //過濾出 senior 的班表
            const sen_sum = employeeData_InName
                .filter(x => x.rank === "senior")
                .reduce((sum, employ) => sum += employ.schedule[index]
                , '')
            return [sen_sum, jun_sum];
        });
    };

// 在空空的<tr>中放入我要放的<th>跟<td>*7
    function createListElement(){
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
    };

// 將 shiftTable 大陣列中的senior班表放入DOM表單
    function createSeniorShiftTable(shiftTable){
        const senTitle = document.querySelector('.senlist th');
        senTitle.innerHTML = '壓粉奶泡手';
        const senList = document.querySelectorAll('.senlist td');
        senList.forEach((e,index) => {
            e.innerHTML = shiftTable[index][0]
                .split('')
                .map(e => `<span>${e}</span>`)
                .join('');
        });
    };

// 將 shiftTable 大陣列中的junior班表放入DOM表單
    function createJuniorShiftTable(shiftTable){
        const junTitle = document.querySelector('.junlist th');
        junTitle.innerHTML = '點單備料員';
        const junList = document.querySelectorAll('.junlist td');
        junList.forEach((e,index) => {
            e.innerHTML = shiftTable[index][1]
                .split('')
                .map(e => `<span>${e}</span>`)
                .join('');
        });
    };

// 將表中 PT 跟 FT 的員工分別設置不同的顏色
    function SeparateJobType(employeeData){
        const allList = document.querySelectorAll('span');
        PTEmployees = employeeData
                    .filter(x => x.jobType === "PT")
                    .map(x => x.code);
        FTEmployees = employeeData
                    .filter(x => x.jobType === "FT")
                    .map(x => x.code);
        allList.forEach(e => {
            PTEmployees.forEach(PTEmployee => {
                if(PTEmployee === e.innerText ? e.style.color = 'blue' : '');
            });
            FTEmployees.forEach(FTEmployee => {
                if(FTEmployee === e.innerText ? e.style.color = 'red' : '');
            });
            
        });
    };


// 每日人力需求預測
const employeeResourceForecast = Array(7).fill([3,2]);

// PT給出的班表
var PT_Data = [
    {code: "P", schedule: [[1,1],[0,0],[1,0],[1,0],[0,1],[0,0],[1,1]], jobType: 'PT', rank: 'senior'},
    {code: "M", schedule: [[1,1],[0,0],[1,0],[1,0],[0,1],[0,0],[1,1]], jobType: 'PT', rank: 'senior'},
    {code: "I", schedule: [[0,0],[1,1],[1,0],[1,0],[0,1],[0,0],[1,1]], jobType: 'PT', rank: 'senior'},
    {code: "Q", schedule: [[0,0],[1,1],[1,0],[1,0],[0,1],[0,0],[1,1]], jobType: 'PT', rank: 'junior'}
];

FT_NeededPerDay();

function FT_NeededPerDay(){
    //建立一個新data，將布林值轉換成各員工代號
    PT_Data_InName = PT_Data_ToName(PT_Data);

    // PT人力需求預測
    const PT_ResourceForecast = employeeResourceForecast.map(dayForecast => dayForecast.map(e => e - 1));
    // 列出 PT 需求人數與可上班人員
    PT_NeededOnDuty = list_PT_onDutyTable(PT_ResourceForecast)

    // 萬一PT早晚皆可上班讓PT優先填滿晚上那個缺
    // PT_NeededOnDuty2 = PT_NeededOnDuty.map(perDay => {
    //     console.log(perDay);
    //     console.log(perDay[0].canDuty.split(''));
    //     perDay[0].canDuty = perDay[0].canDuty.split('').map(e => {
    //         // perDay[1].canDuty.split('').forEach(f => {
    //         //     if(f === e){
    //         //         return e = '';
    //         //     }
    //         //     // return e
    //         // })
    //         // if(e === 'P'){
    //         //     console.log('stop forEach')
    //         //     return e = '';
    //         // }
    //         // return e
    //     }).join('')
    //     // return {
    //     //     Needed: perDay.Needed,
    //     //     canDuty: sdf
    //     // }
    // })

    console.log("PT_NeededOnDuty", PT_NeededOnDuty)
    // console.log("PT_NeededOnDuty", PT_NeededOnDuty2)
};


// 將 PT_Data 上班日的布林值轉換成各員工代號
function PT_Data_ToName(PT_Data){
    return PT_Data.map(data => {
        schedule_InName = data.schedule.map(e => {
            return e = e.map(onDuty => onDuty === 1 ? data.code : '')
        });
        return data = {
            code: data.code,
            schedule: schedule_InName,
            jobType: data.jobType,
            rank: data.rank
        }
    })
};

// 列出 PT 需求人數與可上班人員
function list_PT_onDutyTable(PT_ResourceForecast) {
    return PT_ResourceForecast.map((ResourceForecastPerDay,index) => {
        return ResourceForecastPerDay.map((Shift,idx) => {
            PT_onDuty = PT_Data_InName.map(e => e.schedule[index][idx]).join('');
            return {
                Needed: Shift,
                canDuty: PT_onDuty
            }
        })
    });
}

// 鵬化幫解
// const arr = [{Needed: 2, canDuty: "PM"},{Needed: 1, canDuty: "PM"}];

// const newArr = arr.slice().flatMap((obj, index) => {
//   let strArr = obj.canDuty.split('');
//   let str = obj.canDuty;
//   if(index + 1 == arr.length) return;
//   if(obj.canDuty != arr[index + 1].canDuty) return;
//   if(strArr.find(strr => strr == 'P')) {
//     arr[index + 1].canDuty = 'P';
//     strArr.splice(str.indexOf('P'), 1); 
//   } 
//   if(!strArr.find(strr => strr == 'P')) {
//     console.log(strArr)
//     obj.canDuty = strArr.join('');
//   }
//   return arr
// }).filter(obj => obj)
// console.log(newArr)


// 整理邏輯
// 若早晚人員相同，隨機取一位給晚班，剩餘人員早班
if([{Needed: 2, canDuty: "PMIQ"},{Needed: 1, canDuty: "PMIQ"}]){
    [{Needed: 2, canDuty: "MIQ"},{Needed: 1, canDuty: "P"}];
}
// 若有人只能晚班，則只能晚班的優先晚班
if([{Needed: 2, canDuty: "PIQ"},{Needed: 1, canDuty: "PMIQ"}]){
    [{Needed: 2, canDuty: "PIQ"},{Needed: 1, canDuty: "M"}];
}
if([{Needed: 2, canDuty: "PMIQ"},{Needed: 1, canDuty: "P"}]){
    [{Needed: 2, canDuty: "MIQ"},{Needed: 1, canDuty: "P"}];
}

PT_NeededOnDuty2 = [
    [{Needed: 2, canDuty: "PMI"},{Needed: 1, canDuty: "PMIQ"}],
    [{Needed: 2, canDuty: "NHG"},{Needed: 1, canDuty: "NHGK"}]
]

PT_canDuty = PT_NeededOnDuty2.map(e => {
    return e.map(e => e.canDuty)
})
console.log(PT_canDuty);

PT_onDuty = PT_canDuty.map(e => {
    if(e[0] === e[1]){
        arr = e[0].split('')
        randon = Math.floor((Math.random() * arr.length))
        chosenOne = arr[randon]
        arr[randon] = ''
        return [arr.join(''), chosenOne]
    }
    else if (e[0] > e[1]){
        arr = e[1].split('')
        randon = Math.floor((Math.random() * arr.length))
        chosenOne = arr[randon]
        daytime = e[0].split('').filter(e => e != chosenOne).join('')
        return [daytime, chosenOne]
    }
    else {
        arr0 = e[0].split('')
        arr1 = e[1].split('')
        daytime = arr1.filter((e, index) => e === arr0[index]).join('');
        nighttime = arr1.filter((e, index) => e != arr0[index]).join('')
        return [daytime, nighttime]
    }
})
console.log(PT_onDuty)
