Vue.component('input-resource-forecast', {
    data() {
        return{
            inputResourceForecast: '輸入預估人力表'
        }
    },
    template: 
    `<section>
        <h2>{{ inputResourceForecast }}</h2>
        <div class="table-responsive">
            <table class="table table-sm table-hover" id="resourceForecast">
                <thead>
                    <tr>
                        <th scope="col">班別</th>
                        <th scope="col">一</th>
                        <th scope="col">二</th>
                        <th scope="col">三</th>
                        <th scope="col">四</th>
                        <th scope="col">五</th>
                        <th scope="col">六</th>
                        <th scope="col">日</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="employee">
                        <th>早班</th>
                        <td><input class="decorationLine" type="number" value="3" min="0" max="4" name="dayTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="3" min="0" max="4" name="dayTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="3" min="0" max="4" name="dayTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="3" min="0" max="4" name="dayTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="3" min="0" max="4" name="dayTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="3" min="0" max="4" name="dayTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="3" min="0" max="4" name="dayTimeResourceForecast"></td>
                    </tr>
                    <tr class="employee">
                        <th>晚班</th>
                        <td><input class="decorationLine" type="number" value="2" min="0" max="4" name="nightTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="2" min="0" max="4" name="nightTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="2" min="0" max="4" name="nightTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="2" min="0" max="4" name="nightTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="2" min="0" max="4" name="nightTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="2" min="0" max="4" name="nightTimeResourceForecast"></td>
                        <td><input class="decorationLine" type="number" value="2" min="0" max="4" name="nightTimeResourceForecast"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})


Vue.component('input-shifttable-list', {
    data() {
        return {
            inputShifttableList: '輸入PT可上班日',
            PT_datas: [
                {
                    id: 0,
                    code: "Q",
                    jobType: 'PT',
                    rank: 'junior',
                    daySchedule: '1111111',
                    nightSchedule: '0000000',
                },
                {
                    id: 1,
                    code: "R",
                    jobType: 'FT',
                    rank: 'senior',
                    daySchedule: '0000000',
                    nightSchedule: '1111111',
                },
                {
                    id: 2,
                    code: "T",
                    jobType: 'PT',
                    rank: 'junior',
                    daySchedule: '1110011',
                    nightSchedule: '0001111',
                }
            ]
        }
    },
    template: 
    `<section>
        <h2>{{ inputShifttableList }}</h2>
        <button v-on:click='addEmployeeInput()' type="button" class="btn btn-success" id="addEmployee">新增輸入欄</button>
        <div class="table-responsive">
            <table class="table table-sm table-hover" id="inputShiftTable">
                <thead>
                    <tr>
                        <th scope="col">代號</th>
                        <th scope="col">職種</th>
                        <th scope="col">等級</th>
                        <th scope="col">一</th>
                        <th scope="col">二</th>
                        <th scope="col">三</th>
                        <th scope="col">四</th>
                        <th scope="col">五</th>
                        <th scope="col">六</th>
                        <th scope="col">日</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="employee" v-for='(PT_data, index) in PT_datas' :key="PT_data.id">
                        <th><input type="text" name="PTCode" :value='PT_data.code' class="decorationLine employeeCode"></th>
                        <td>
                            <select class="jobType form-control" name="jobType">
                                <option value="" v-bind:selected="true">職稱</option>
                                <option value="FT" v-bind:selected="jobTypeFT(PT_data.jobType)">正職</option>
                                <option value="PT" v-bind:selected="jobTypePT(PT_data.jobType)">PT</option>
                            </select>
                        </td>
                        <td>
                            <select class="rank form-control" name="rank">
                                <option value="" v-bind:selected="true">能力階級</option>
                                <option value="junior" v-bind:selected="rankJun(PT_data.rank)">Junior</option>
                                <option value="senior" v-bind:selected="rankSen(PT_data.rank)">Senior</option>                    
                            </select>
                        </td>
                        <td><input type="checkbox" name="daySchedule" v-bind:checked="schedule(PT_data.daySchedule, 0)"><br><input type="checkbox" name="nightSchedule" v-bind:checked="schedule(PT_data.nightSchedule, 0)"></td>
                        <td><input type="checkbox" name="daySchedule" v-bind:checked="schedule(PT_data.daySchedule, 1)"><br><input type="checkbox" name="nightSchedule" v-bind:checked="schedule(PT_data.nightSchedule, 1)"></td>
                        <td><input type="checkbox" name="daySchedule" v-bind:checked="schedule(PT_data.daySchedule, 2)"><br><input type="checkbox" name="nightSchedule" v-bind:checked="schedule(PT_data.nightSchedule, 2)"></td>
                        <td><input type="checkbox" name="daySchedule" v-bind:checked="schedule(PT_data.daySchedule, 3)"><br><input type="checkbox" name="nightSchedule" v-bind:checked="schedule(PT_data.nightSchedule, 3)"></td>
                        <td><input type="checkbox" name="daySchedule" v-bind:checked="schedule(PT_data.daySchedule, 4)"><br><input type="checkbox" name="nightSchedule" v-bind:checked="schedule(PT_data.nightSchedule, 4)"></td>
                        <td><input type="checkbox" name="daySchedule" v-bind:checked="schedule(PT_data.daySchedule, 5)"><br><input type="checkbox" name="nightSchedule" v-bind:checked="schedule(PT_data.nightSchedule, 5)"></td>
                        <td><input type="checkbox" name="daySchedule" v-bind:checked="schedule(PT_data.daySchedule, 6)"><br><input type="checkbox" name="nightSchedule" v-bind:checked="schedule(PT_data.nightSchedule, 6)"></td>
                        <td><button id="delBtn" v-on:click='delEmployee(index)' type="button" class="btn btn-danger">Del</button></td>
                    </tr>
                    
                </tbody>
            </table> 
        </div>
    </section>`,
    methods: {
        addEmployeeInput() {
            this.saveData();
            let employee = document.querySelectorAll('#inputShiftTable tbody tr');
            let lastInput = employee.length - 1;
            
            let isEmployeeCodeEmpty = employee[lastInput].cells[0].children[0].value != '' ? true : false ;
            let isEmployeeJobTypeEmpty = employee[lastInput].cells[1].children[0].value != '' ? true : false ;
            let isEmployeeRankEmpty = employee[lastInput].cells[2].children[0].value != '' ? true : false ;
            if( isEmployeeCodeEmpty || isEmployeeJobTypeEmpty || isEmployeeRankEmpty ){
                console.log('要加新的一列');
                this.PT_datas.push({
                    id: 0,
                    code:'',
                    jobType: 'PT',
                    rank: '',
                    daySchedule: '0000000',
                    nightSchedule: '0000000'
                });
            } else {
                console.log('你還有空格喔');
                alert('你的最後一欄是空的喔！');
            }
        },
        delEmployee: function(e) {
            this.saveData();
            this.PT_datas.splice(e, 1);
        },
        jobTypeFT(e) {
            return (e === 'FT' ? true : false);
        },
        jobTypePT(e) {
            return (e === 'PT' ? true : false);
        },
        rankJun(e){
            return (e === 'junior' ? true : false);
        },
        rankSen(e){
            return (e === 'senior' ? true : false);
        },
        schedule(schedule, day){
            let scheduleInArray = schedule.split("");
            return (parseInt(scheduleInArray[day]) === 1 ? true : false);
        },
        saveData(){
            let PTCode = document.querySelectorAll("[name=PTCode]");
            let jobType = document.querySelectorAll("[name=jobType]");
            let rank = document.querySelectorAll("[name=rank]");
            let daySchedules = document.querySelectorAll("[name=daySchedule]");
            let dayScheduleInNum = Array.from(daySchedules).map(e => (e.checked === true ? 1 : 0));
            let daySchedule = [];
            let nightSchedules = document.querySelectorAll("[name=nightSchedule]");
            let nightScheduleInNum = Array.from(nightSchedules).map(e => (e.checked === true ? 1 : 0));
            let nightSchedule = [];

            this.PT_datas = this.PT_datas.map((e, index) => {
                daySchedule[index] = dayScheduleInNum.slice(7 * index, 7 * (index + 1)).join('');
                nightSchedule[index] = nightScheduleInNum.slice(7 * index, 7 * (index + 1)).join('');                
                return {
                    id: index,
                    code: PTCode[index].value,
                    jobType: jobType[index].value,
                    rank: rank[index].value,
                    daySchedule: daySchedule[index],
                    nightSchedule: nightSchedule[index]
                }
            });
        }
    },
});

Vue.component('result-shift-table', {
    data() {
        return {
            resultShiftTable: '各班別 PT 需求人數與 可選用職員',
            employeeResourceForecast: [],
            ptDatas: [],
            ptDataInName: [],
            ptResourceForecast: [],
            ptNeededOnDuty: [],
        }
    },
    template:
    `<section>
        <button v-on:click='makeFTresourceTable()' type="button" class="btn btn-info" id="makeFTresourceTable">輸出PT需求人數與人員</button>
        <h2>{{ resultShiftTable }}</h2>
        <div class="table-responsive">
            <table class="table table-sm table-hover" id="resultShiftTable">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">一</th>
                        <th scope="col">二</th>
                        <th scope="col">三</th>
                        <th scope="col">四</th>
                        <th scope="col">五</th>
                        <th scope="col">六</th>
                        <th scope="col">日</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="dayShiftTable" class="senlist">
                        <th>早班</th>
                    </tr>
                    <tr id="nightShiftTable" class="junlist">
                        <th>晚班</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`,
    methods: {
        makeFTresourceTable(){
            this.makeResourceForecast();
            this.buildPTData();
            this.ptDataInName = this.PTDataToName(this.ptDatas);
            this.ptNeededOnDuty = this.listPTonDutyTable(this.ptResourceForecast,this.ptDataInName);
            this.createListElement();
            this.createDaytimeShiftTable(this.ptNeededOnDuty);
            this.createNighttimeShiftTable(this.ptNeededOnDuty);
            // mainFunction(this.ptNeededOnDuty);
        },
        makeResourceForecast(){
            let getDaytimeForecast = document.querySelectorAll('[name=dayTimeResourceForecast]');
            let daytimeForecastData = Array.from(getDaytimeForecast).map(e => parseInt(e.value, 10));
            let getNightTimeForecast = document.querySelectorAll('[name=nightTimeResourceForecast]');
            let nightTimeForecastData = Array.from(getNightTimeForecast).map(e => parseInt(e.value, 10));
            
            this.employeeResourceForecast = daytimeForecastData.map((daytimeForecastData,i) => {
                return [daytimeForecastData,nightTimeForecastData[i]];
            });
            this.ptResourceForecast = this.employeeResourceForecast.map(dayForecast => dayForecast.map(e => e - 1));
        },
        buildPTData(){
            employee = document.querySelectorAll('#inputShiftTable tbody tr');
        
            this.ptDatas = Array.from(employee).map(e => {
                let daySchedule = e.querySelectorAll('[name=daySchedule]');
                let nightSchedule = e.querySelectorAll('[name=nightSchedule]');
                dayScheduleData = Array.from(daySchedule).map(e => e.checked === true ? 1 : 0);
                nightScheduleData = Array.from(nightSchedule).map(e => e.checked === true ? 1 : 0);
                let schedule = dayScheduleData.map((dayScheduleData,i) => [dayScheduleData,nightScheduleData[i]]);
                return {
                    code: e.querySelector('[name=PTCode]').value,
                    jobType: e.querySelector('[name=jobType]').value,
                    rank: e.querySelector('[name=rank]').value,
                    schedule: schedule,
                }
            });
        },
        PTDataToName(e){
            return e.map(data => {
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
        },
        listPTonDutyTable(PT_ResourceForecast,PT_Data_InName) {
            return PT_ResourceForecast.map((ResourceForecastPerDay,index) => {
                return ResourceForecastPerDay.map((Shift,idx) => {
                    PT_onDuty = PT_Data_InName.map(e => e.schedule[index][idx]).join('');
                    return {
                        Needed: Shift,
                        canDuty: PT_onDuty
                    }
                })
            })
        },
        createListElement(){
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
            )
        },
        createDaytimeShiftTable(ptNeededOnDuty){
            const dayTitle = document.querySelector('#resultShiftTable #dayShiftTable th');
            dayTitle.innerHTML = '早班 PT';
            const dayList = document.querySelectorAll('#resultShiftTable #dayShiftTable td');
            dayList.forEach((e,index) => {
                e.innerHTML = `${ptNeededOnDuty[index][0].Needed}<br>${ptNeededOnDuty[index][0].canDuty}`;
            })
        },
        createNighttimeShiftTable(ptNeededOnDuty){
            const nightTitle = document.querySelector('#resultShiftTable #nightShiftTable th');
            nightTitle.innerHTML = '晚班 PT';
            const nightList = document.querySelectorAll('#resultShiftTable #nightShiftTable td');
            nightList.forEach((e,index) => {
                e.innerHTML = `${ptNeededOnDuty[index][1].Needed}<br>${ptNeededOnDuty[index][1].canDuty}`;
            })
        },
    }
})

var app = new Vue({
    el:'#shift_arrangement_table',
    data: {
        title: 'Shift Arrangement Table 班表系統'
    },
    methods: {
        
    },
});
Vue.config.devtools = true;