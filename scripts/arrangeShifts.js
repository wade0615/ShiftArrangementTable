// 第二階段的做法，用陣列將整放資料包起來，再不斷用 .map 重整與建立新資料
const employeeData = [
    //{code: "H", schedule: [1,1,0,0,1,1,1], jobType: 'FT', rank: 'senior'}, //每個物件會有一個員工代號與選擇休假日的陣列
    {code: "N", schedule: [1,1,1,1,0,1,1], jobType: 'FT', rank: 'senior'}, //休假陣列用 布林值 表示
    {code: "B", schedule: [0,1,1,1,1,1,0], jobType: 'FT', rank: 'senior'},

    {code: "C", schedule: [1,1,1,1,1,0,1], jobType: 'FT', rank: 'junior'},
    {code: "E", schedule: [1,1,1,1,0,1,0], jobType: 'FT', rank: 'junior'},

    {code: "P", schedule: [1,0,1,1,0,0,1], jobType: 'PT', rank: 'senior'},
    {code: "M", schedule: [1,1,1,0,1,0,0], jobType: 'PT', rank: 'senior'},
    {code: "I", schedule: [0,1,1,0,1,1,1], jobType: 'PT', rank: 'senior'},

    {code: "Q", schedule: [0,0,0,0,0,0,1], jobType: 'PT', rank: 'junior'}
];

const employeeData_InName = employeeData.map(data => { //建立一個新data，將布林值轉換成各員工代號
    schedule_InName = data.schedule.map(e => {return (e === 1 ? data.code : '')});
    return data = {
        code: data.code,
        schedule: schedule_InName,
        jobType: data.jobType,
        rank: data.rank
    }
});
console.log(employeeData_InName);

const employeeSchedule = employeeData_InName.map(e => { // 取出含有各員工代號的休假日陣列
    return e.schedule;
})
// console.table(employeeSchedule);

function makeShiftTable(e){ //依照日期顯示各日可上班的員工
    shiftTable = [];
    for(i=0; i<7; i++) {
        // ShiftTable[i] = e[0][i] + e[1][i] + e[2][i];
        employees = [];
        for(cont=0; cont < e.length; cont++) {
            employees[cont] = e[cont][i];
            // console.log(employees);
        }
        shiftTable[i] = employees.join('');
    };
    return shiftTable;
};

ShiftTable = [];
ShiftTable = makeShiftTable(employeeSchedule); //生成班表
// console.log(ShiftTable);
console.table(ShiftTable);

// 第三階段的做法，employeeData不一起處理，先分出能力是 Senior 還是 junior，生出個別班表，再合併成一個
//此階段在維持架構為一間店的情況下，分析各員工的身份與能力，分為四種：
// 正職奶泡(FT-Senior)
// 正職點單(FT-Junior)
// 工讀奶泡(PT-Senior)
// 工讀點單(PT-Junior)
// 並以奶泡為優先，點單為次要，讓大家都有班

const seniorEmployeeSchedule = employeeData_InName
    .filter(e => e.rank === 'senior') // 過濾出 senior 的員工
    .map(e => e.schedule); //取出 senior 的班表
seniorShiftTable = makeShiftTable(seniorEmployeeSchedule);
console.log(seniorShiftTable);

const juniorEmployeeSchedule = employeeData_InName
    .filter(e => e.rank === 'junior') // 過濾出 junior 的員工
    .map(e => e.schedule); //取出 junior 的班表
juniorShiftTable = makeShiftTable(juniorEmployeeSchedule);
console.log(juniorShiftTable);

var NewShiftTable = [];
function makeNewShiftTable(senior, junior) {
    let NST = [[],[],[],[],[],[],[]];
    for(i=0; i<7; i++) {
        NST[i][0] = senior[i];
        NST[i][1] = junior[i];
    };
    return NST;
}

NewShiftTable = makeNewShiftTable(seniorShiftTable, juniorShiftTable);
console.log(NewShiftTable);