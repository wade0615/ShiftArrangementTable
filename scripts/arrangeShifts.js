// 建立班表空陣列
let employeeResourceForecast = [];

makeResourceForecast();
function makeResourceForecast(){
    let getDaytimeForecast = document.querySelectorAll('[name=dayTimeResourceForecast]');
    let daytimeForecastData = Array.from(getDaytimeForecast).map(e => parseInt(e.value, 10));
    let getNightTimeForecast = document.querySelectorAll('[name=nightTimeResourceForecast]');
    let nightTimeForecastData = Array.from(getNightTimeForecast).map(e => parseInt(e.value, 10));
    
    employeeResourceForecast = daytimeForecastData.map((daytimeForecastData,i) => {
        return [daytimeForecastData,nightTimeForecastData[i]];
    });
    
    console.log("makeResourceForecast -> employeeResourceForecast", employeeResourceForecast)
    return employeeResourceForecast;
};

// 建立輸入表單
let inputList = document.querySelector('#inputShiftTable tbody');
let employee = document.querySelectorAll('#inputShiftTable tbody tr');
let lastInput = employee.length - 1;
// let lastInputCode = employee[lastInput].querySelector('[name=PTCode]');

// 點擊按鈕新增欄位
const addEmployeebtn = document.querySelector('#addEmployee');
addEmployeebtn.addEventListener('click', () => {
    addEmployeeInput();
});

// 自動監測最後一欄值的變化來新增欄位
// autoAddEmployeeInput(inputList,lastInputCode);
// function autoAddEmployeeInput(){
//     inputList.querySelectorAll('[name=PTCode]').forEach(e => {
//         e.removeEventListener('input', () => {addEmployeeInput();})
//     });
//     lastInputCode.addEventListener('input', () => {
//         addEmployeeInput();
//     });
// }

function addEmployeeInput(){
    employee = document.querySelectorAll('#inputShiftTable tbody tr');
    lastInput = employee.length - 1;
    let isEmployeeCodeEmpty = employee[lastInput].cells[0].children[0].value != '' ? true : false ;
    let isEmployeeJobTypeEmpty = employee[lastInput].cells[1].children[0].value != '' ? true : false ;
    let isEmployeeRankEmpty = employee[lastInput].cells[2].children[0].value != '' ? true : false ;
    if( isEmployeeCodeEmpty || isEmployeeJobTypeEmpty || isEmployeeRankEmpty ){
        console.log('要加新的一列');
        inputList.append(document.createElement("tr"));
        let lastchild = inputList.lastElementChild;
        lastchild.classList.add('employee');
        lastchild.innerHTML = `
        <th><input type="text" name="PTCode" class="employeeCode"></th>
        <td>
            <select class="form-control" name="jobType">
                <option value="">請選擇職種</option>
                <option value="FT">正職</option>
                <option value="PT" selected>PT</option>                    
            </select>
        </td>
        <td>
            <select class="form-control" name="rank">
                <option value="">請選擇能力等級</option>
                <option value="jun">Junior</option>
                <option value="sen">Senior</option>                    
            </select>
        </td>
        <td><input type="checkbox" name="" id=""><br><input type="checkbox" name="" id=""></td>
        <td><input type="checkbox" name="" id=""><br><input type="checkbox" name="" id=""></td>
        <td><input type="checkbox" name="" id=""><br><input type="checkbox" name="" id=""></td>
        <td><input type="checkbox" name="" id=""><br><input type="checkbox" name="" id=""></td>
        <td><input type="checkbox" name="" id=""><br><input type="checkbox" name="" id=""></td>
        <td><input type="checkbox" name="" id=""><br><input type="checkbox" name="" id=""></td>
        <td><input type="checkbox" name="" id=""><br><input type="checkbox" name="" id=""></td>
        <td><button type="button" class="btn btn-danger delEmployee">Del</button></td>
        `
        employee = document.querySelectorAll('#inputShiftTable tbody tr');
        lastInput = employee.length - 1;
        delEmployee();
    } else {
        console.log('你還有空格喔')
    }
};

// 點擊刪除按鈕刪除單一員工資料
function delEmployee(){
    const delEmployeebtn = document.querySelectorAll('.delEmployee');
    delEmployeebtn.forEach(e => {
        e.addEventListener('click', function(){
        this.closest("tr").remove();
        })
    });
};

// 建立PT資料
let newPT_data = [];

buildPT_data()
function buildPT_data(){
    newPT_data = Array.from(employee).map(e => {
        return {
            code: e.querySelector('[name=PTCode]').value,
            jobType: e.querySelector('[name=jobType]').value,
            rank: e.querySelector('[name=rank]').value
        }
    });
    console.log("newPT_data", newPT_data);
}


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
    // makeShiftTable (employeeData);
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
        const resultShiftTableTr = document.querySelectorAll('#resultShiftTable tbody tr');
        resultShiftTableTr.forEach(resultShiftTableTr => {
            var insideTr = [];
            insideTr.push('<th scope="row"></th>');
            for(i=0;i<7;i++) {
                insideTr.push('<td></td>')
            };
            insideTr = insideTr.join('')
            resultShiftTableTr.innerHTML = insideTr;
            }
        );
    };

// 將 shiftTable 大陣列中的senior班表放入DOM表單
    function createSeniorShiftTable(shiftTable){
        const senTitle = document.querySelector('#resultShiftTable .senlist th');
        senTitle.innerHTML = '壓粉奶泡手';
        const senList = document.querySelectorAll('#resultShiftTable .senlist td');
        senList.forEach((e,index) => {
            e.innerHTML = shiftTable[index][0]
                .split('')
                .map(e => `<span>${e}</span>`)
                .join('');
        });
    };

// 將 shiftTable 大陣列中的junior班表放入DOM表單
    function createJuniorShiftTable(shiftTable){
        const junTitle = document.querySelector('#resultShiftTable .junlist th');
        junTitle.innerHTML = '點單備料員';
        const junList = document.querySelectorAll('#resultShiftTable .junlist td');
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
// const employeeResourceForecast = Array(7).fill([3,2]);
// console.log("employeeResourceForecast", employeeResourceForecast)

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


    // console.log("PT_NeededOnDuty", PT_NeededOnDuty)
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
    [{Needed: 2, canDuty: "PMR"},{Needed: 1, canDuty: "PMIQ"}],
    [{Needed: 2, canDuty: "NHG"},{Needed: 1, canDuty: "NHGK"}]
]

PT_canDuty = PT_NeededOnDuty2.map(e => {
    return e.map(e => e.canDuty)
})
// console.log(PT_canDuty);

const employees = {
    ofDayTime: 0,
    ofNightTime: 1
}

PT_onDuty = PT_canDuty.map(choosePTofNightTime())
// console.log(PT_onDuty)
function choosePTofNightTime() {
    return e => {
        if (e[employees.ofDayTime].split('').length === e[employees.ofNightTime].split('').length) {
            console.log('A===B')
            daytimeEmployees = e[employees.ofDayTime].split('');
            randon = Math.floor((Math.random() * daytimeEmployees.length));
            chosenOne = daytimeEmployees[randon];
            daytimeEmployees[randon] = '';
            return [daytimeEmployees.join(''), chosenOne];
        }
        else if (e[employees.ofDayTime].split('').length > e[employees.ofNightTime].split('').length) {
            console.log('A>B')
            nighttimeEmployees = e[employees.ofNightTime].split('');
            randon = Math.floor((Math.random() * nighttimeEmployees.length));
            chosenOne = nighttimeEmployees[randon];
            daytime = e[employees.ofDayTime].split('').filter(e => e != chosenOne).join('');
            return [daytime, chosenOne];
        }
        else { //if (e[employees.ofDayTime] < e[employees.ofNightTime])
            // console.log('A<B')
            // 先將早晚班人員字串都轉成陣列
            daytimeEmployees = e[employees.ofDayTime].split('');
            nighttimeEmployees = e[employees.ofNightTime].split('');
            // 將晚班人員逐一過濾是否也符合早班人員，將早晚班皆可的人員優先排去早班
            daytime = nighttimeEmployees.map(e => 
                daytimeEmployees.filter(r => e === r)).join('');
            //將原有就只能早班的人員也加入早班行列
            onlyDaytimePT = daytimeEmployees.map(e => {
                if(daytime.includes(e)){
                    return
                }
                return e
            }).join('');
            daytime = [daytime, onlyDaytimePT].join('')
            // console.log(daytime)
            
            nighttimeEmployees = nighttimeEmployees.filter((e, index) => e != daytimeEmployees[index]).join('');
            randon = Math.floor((Math.random() * nighttimeEmployees.length));
            nighttime = nighttimeEmployees[randon];
            return [daytime, nighttime];
        }
    };
}

// 鵬化支援，鵬化建議 find slice every
// const canDuty = 'PMIQ'.split(''); // get data and split immediately
// const result = 'P'; // select the target code

// const ans = canDuty.find(str => str == result);
// const index = canDuty.indexOf(ans);
// canDuty.splice(index, 1);
// const newStr = canDuty.join('');

// console.log('ans', ans);
// console.log('newStr', newStr);
