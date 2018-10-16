;(function (Vue) {
	const todos = [
		{
			id: 1,
			title: 'zhangsan',
			completed: false
		},
		{
			id: 2,
			title: 'lisi',
			completed: true
		}
	];
	Vue.directive('focus', {
		inserted: function(el){
			el.focus();
		}
	});
	Vue.directive('update', {
		componentUpdated: function(el){
			el.focus();
		}
	});
	window.app = new Vue({
		el: '#todoapp',
		data: {
			todos,
			allChecked: false,
			hash: '',
			currentItem: null
		},
		computed: {
			left: function(){
				return this.todos.filter(item => !item.completed).length;
			},
			newTodos: function(){
				switch(this.hash){
					case 'active': return this.todos.filter(item => !item.completed);
					case 'completed': return this.todos.filter(item => item.completed);
					default: return this.todos;
				}
			}
			// checked: function(){
			// 	return this.todos.every( item => item.completed);
			// }
		},
		methods: {
			checkAll(){
				this.todos.forEach(item => item.completed = !this.allChecked)
			},
			chooseAll(){
				this.allChecked = this.todos.every(item => item.completed);
				// console.log(this.allChecked);
			},
			addToDo(e){
				var id = this.todos.length?this.todos[this.todos.length-1].id + 1: 1;
				var title = e.target.value;
				// console.log(e);
				this.todos.push({
					id: id,
					title: title,
					completed: false
				});
				e.target.value = '';
			},
			removeToDo(item, index, e){
				this.todos.splice(index, 1);
			},
			clearAll(){
				this.todos = this.todos.filter(item => !item.completed);
			},
			toggleEdit(item, index, e){
				this.currentItem = item;
			},
			saveEdit(item, index, e){
				var v = e.target.value;
				if(!v){
					this.todos.splice(index, 1);
				}
				item.title = v;
				this.currentItem = null;
			},
			notSave(item, index, e){
				item.title = this.currentItem.title;
				this.currentItem = null;
			}
		}
	});
	window.onhashchange = function(){
		app.hash = location.hash.substr(2);
	}
})(Vue);
