window.onload = function () {
    // タスクリストの作成(配列)
    let taskList = [];
    // タスクを記述するテーブルタグ(tbody)のIDを取得(タスクリスト)
    const listArea = document.getElementById('listarea');
    // 各ボタンの位置
    const btnAll = document.getElementById('btnAll');
    const btnWork = document.getElementById('btnWork');
    const btnComplete = document.getElementById('btnComplete');
    // タスクを格納する連想配列を作成する関数
    // inputボタンの値を受け取る
    const addTask = (taskValue) => {
        const task = {
            id: taskList.length,
            comment: taskValue,
            state: 0
        };
        taskList.push(task);
    }
    // 「作業中」ボタンの追加
    const addWorkBtn = () => {
        const td = document.createElement('td');
        const button = document.createElement('button');
        listArea.lastElementChild.appendChild(td).appendChild(button).textContent = '作業中';
        return button;
    };
    // 「作業中」ボタン押下時のイベントの追加
    const addWorkEvent = (button,index) => {
        button.addEventListener('click', function() {
            if (taskList[index].state === 0 ) {
                this.textContent = '完了'
                taskList[index].state = 1;
            } else if(taskList[index].state === 1) {
                this.textContent = '作業中'
                taskList[index].state = 0;
            };
            displayTodos();
        });
    };
    // 「削除」ボタンの追加
    const addRemoveBtn = () => {
        const td = document.createElement('td');
        const button = document.createElement('button');
        listArea.lastElementChild.appendChild(td).appendChild(button).textContent = '削除';
        return button;
    };
    // 「削除」ボタン押下時のイベントの追加
    const addRemoveEvent = (button,index) => {
        button.addEventListener('click', function() {
            // 配列から対象の要素を削除して積める
            taskList.splice( index, 1 );
            // 各タスクのidの降り直し
            for (let i = 0; i < taskList.length; i++) {
                taskList[i].id = i;
            };
            // htmlへの再出力
            displayTodos();
        });
    };
    // TODOリストの出力処理
    const displayTodos = () => {
        // タスクリストのタイトル部分以外を削除
        listArea.innerHTML = '';
        // フォームの内容をからにする
        document.getElementById('task').value = '';
        // 配列「タスクリスト」から条件に応じて繰り返し処理を行う
        // 配列のindex番号(=taskのid)をforeachの第二引数とし、削除・作業中ボタンの動作処理に渡す
        taskList.forEach((value,i) => {
            const repeat = () => {
                const tr = document.createElement('tr');
                listArea.appendChild(tr);
                const tdId = document.createElement('td');
                listArea.lastElementChild.appendChild(tdId).textContent = value.id;
                const tdTask = document.createElement('td');
                listArea.lastElementChild.appendChild(tdTask).textContent = value.comment;
                const workBtn = addWorkBtn();
                if (value.state == 1) {
                    workBtn.textContent = '完了';
                }
                addWorkEvent(workBtn,i);
                const removeBtn = addRemoveBtn();
                addRemoveEvent(removeBtn,i);
            };
            if (btnAll.checked === true) {
                repeat();
            } else if(btnWork.checked == true) {
                if (value.state !== 1) {
                    repeat();
                }
            } else if(btnComplete.checked == true) {
                if (value.state !== 0) {
                    repeat();
                }
            }
        });
    };
    // 追加ボタンが押下された時の処理
    const addEvent = () => {
        // 追加するタスクの内容を取得
        const taskValue = document.getElementById('task').value;
        // タスクの内容(taskValue)をタスクの追加関数(addTask)に渡す
        addTask(taskValue);
        displayTodos();
    }
    document.getElementById('addbtn').addEventListener('click', addEvent);
    // ラジオボタンの操作
    btnAll.addEventListener('click', displayTodos);
    btnWork.addEventListener('click', displayTodos);
    btnComplete.addEventListener('click', displayTodos);
}