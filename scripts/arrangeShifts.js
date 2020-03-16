
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
    makeShiftTable (employeeData)
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
console.log(employeeResourceForecast);

// PT人力需求預測
const PT_ResourceForecast = employeeResourceForecast.map(dayForecast => {
    return dayForecast.map(e => e - 1);
});
console.log(PT_ResourceForecast);

// PT給出的班表
var PT_Data = [
    {code: "P", schedule: [[1,1],[0,0],[1,0],[1,0],[0,1],[0,0],[1,1]], jobType: 'PT', rank: 'senior'},
    {code: "M", schedule: [[1,1],[0,0],[1,0],[1,0],[0,1],[0,0],[1,1]], jobType: 'PT', rank: 'senior'},
    {code: "I", schedule: [[0,0],[1,1],[1,0],[1,0],[0,1],[0,0],[1,1]], jobType: 'PT', rank: 'senior'},
    {code: "Q", schedule: [[0,0],[1,1],[1,0],[1,0],[0,1],[0,0],[1,1]], jobType: 'PT', rank: 'junior'}
];

