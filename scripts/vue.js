new Vue({
    el:'#app',
    methods: {
        addEmployeeInput: function (){
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
})