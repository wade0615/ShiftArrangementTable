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
            employeeResourceForecast: [],
            PT_datas: [
                {
                    code: "Q"
                },
                {
                    code: "R"
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
                    <tr class="employee" v-for='(PT_data, index) in PT_datas'>
                        <th><input type="text" name="PTCode" :value='PT_data.code' class="decorationLine employeeCode"></th>
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
                        <td><button v-on:click='delEmployee(index)' type="button" class="btn btn-danger" >Del</button></td>
                    </tr>
                    
                </tbody>
            </table> 
        </div>
        <button v-on:click='makeFTresourceTable()' type="button" class="btn btn-info" id="makeFTresourceTable">輸出PT需求人數與人員</button>
    </section>`,
    methods: {
        addEmployeeInput() {
            let employee = document.querySelectorAll('#inputShiftTable tbody tr');
            let lastInput = employee.length - 1;
            
            let isEmployeeCodeEmpty = employee[lastInput].cells[0].children[0].value != '' ? true : false ;
            let isEmployeeJobTypeEmpty = employee[lastInput].cells[1].children[0].value != '' ? true : false ;
            let isEmployeeRankEmpty = employee[lastInput].cells[2].children[0].value != '' ? true : false ;
            if( isEmployeeCodeEmpty || isEmployeeJobTypeEmpty || isEmployeeRankEmpty ){
                console.log('要加新的一列');
                this.PT_datas.push({code:''});
            } else {
                console.log('你還有空格喔');
                alert('你的最後一欄是空的喔！');
            }
        },
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
            this.employeeResourceForecast = employeeResourceForecast
        },
        delEmployee: function(e) {
            console.log('Del Vue',e);
            this.PT_datas.splice(e, 1);
        },
    },
});

Vue.component('result-shift-table', {
    data() {
        return {
            resultShiftTable: '各班別 PT 需求人數與 可選用職員'
        }
    },
    template:
    `<section>
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
    </section>`
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