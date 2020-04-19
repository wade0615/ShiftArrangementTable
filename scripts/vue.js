Vue.component('input-resource-forecast', {
    data() {
        return{
            inputResourceForecast: '輸入預估人力表'
        }
    },
    template: 
    `<div>
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
    </div>`
})


Vue.component('input-shifttable-list', {
    data() {
        return {
            inputShifttableList: '輸入PT可上班日'
        }
    },
    template: 
    `<div>
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
                    <tr class="employee">
                        <th><input type="text" name="PTCode" value="Q" class="decorationLine employeeCode"></th>
                        <td>
                            <select class="jobType form-control" name="jobType">
                                <option value="">職稱</option>
                                <option value="FT">正職</option>
                                <option value="PT" selected>PT</option>                    
                            </select>
                        </td>
                        <td>
                            <select class="rank form-control" name="rank">
                                <option value="">能力階級</option>
                                <option value="jun">Junior</option>
                                <option value="sen" selected>Senior</option>                    
                            </select>
                        </td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><button type="button" class="btn btn-danger delEmployee">Del</button></td>
                    </tr>
                    <tr class="employee">
                        <th><input type="text" name="PTCode" value="R" class="decorationLine employeeCode"></th>
                        <td>
                            <select class="jobType form-control" name="jobType">
                                <option value="">職稱</option>
                                <option value="FT">正職</option>
                                <option value="PT" selected>PT</option>                    
                            </select>
                        </td>
                        <td>
                            <select class="rank form-control" name="rank">
                                <option value="">能力階級</option>
                                <option value="jun" selected>Junior</option>
                                <option value="sen">Senior</option>
                            </select>
                        </td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                        <td><button type="button" class="btn btn-danger delEmployee">Del</button></td>
                    </tr>
                </tbody>
            </table> 
        </div>
    </div>`,
    methods: {
        addEmployeeInput() {
            let inputList = document.querySelector('#inputShiftTable tbody');
            let employee = document.querySelectorAll('#inputShiftTable tbody tr');
            let lastInput = employee.length - 1;
            
            let isEmployeeCodeEmpty = employee[lastInput].cells[0].children[0].value != '' ? true : false ;
            let isEmployeeJobTypeEmpty = employee[lastInput].cells[1].children[0].value != '' ? true : false ;
            let isEmployeeRankEmpty = employee[lastInput].cells[2].children[0].value != '' ? true : false ;
            if( isEmployeeCodeEmpty || isEmployeeJobTypeEmpty || isEmployeeRankEmpty ){
                console.log('要加新的一列');
                inputList.append(document.createElement("tr"));
                let lastchild = inputList.lastElementChild;
                lastchild.classList.add('employee');
                lastchild.innerHTML = `
                <th><input type="text" name="PTCode" class="decorationLine employeeCode"></th>
                <td>
                    <select class="jobType form-control" name="jobType">
                        <option value="">職稱</option>
                        <option value="FT">正職</option>
                        <option value="PT" selected>PT</option>                    
                    </select>
                </td>
                <td>
                    <select class="rank form-control" name="rank">
                        <option value="">能力階級</option>
                        <option value="jun">Junior</option>
                        <option value="sen">Senior</option>                    
                    </select>
                </td>
                <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                <td><input type="checkbox" name="daySchedule"><br><input type="checkbox" name="nightSchedule"></td>
                <td><button type="button" class="btn btn-danger delEmployee">Del</button></td>
                `
                employee = document.querySelectorAll('#inputShiftTable tbody tr');
                lastInput = employee.length - 1;
                delEmployee();
            } else {
                console.log('你還有空格喔')
            }
        }
    },
});

var app = new Vue({
    el:'#shift_arrangement_table',
    data: {
        title: 'Shift Arrangement Table 班表系統',
        resultShiftTable: '各班別 PT 需求人數與 可選用職員',
        employeeResourceForecast: [],
    },
    methods: {
        makeFTresourceTable(){
            this.makeResourceForecast(this.employeeResourceForecast);
            mainFunction(this.employeeResourceForecast);
        },
        makeResourceForecast(employeeResourceForecast){
            let getDaytimeForecast = document.querySelectorAll('[name=dayTimeResourceForecast]');
            let daytimeForecastData = Array.from(getDaytimeForecast).map(e => parseInt(e.value, 10));
            let getNightTimeForecast = document.querySelectorAll('[name=nightTimeResourceForecast]');
            let nightTimeForecastData = Array.from(getNightTimeForecast).map(e => parseInt(e.value, 10));
            
            employeeResourceForecast = daytimeForecastData.map((daytimeForecastData,i) => {
                return [daytimeForecastData,nightTimeForecastData[i]];
            });
            
            console.log("employeeResourceForecast", employeeResourceForecast)
            // return employeeResourceForecast;
            this.employeeResourceForecast = employeeResourceForecast
        },
    },
});
Vue.config.devtools = true;