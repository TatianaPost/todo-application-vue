const app = new Vue({
	el: '#app',
	data () {
		const data = {}

		data.list = []
		data.input = ''

		return data
	},

	methods: {
		submit () {
			const input = this.input.trim()

			if (!input.length) {
				return
			}

			const item = {
				id: this.list.length + 1,
				content: input,
				selected: false,
				done: false
			}

			this.list.unshift(item)
			this.input = ''
		},

		selectAll () {
			const newState = !this.selected

			for (const item of this.list) {
				item.selected = newState
			}
		},

		doneAll () {
			for (const item of this.list) {
				item.done = true
			}
		},

		restoreAll () {
			for (const item of this.list) {
				item.done = false
			}
		},

		remove (removedItem) {
			const list = []

			for (const item of this.list) {
				if (item !== removedItem) {
					list.push(item)
					item.id = list.length
				}
			}

			this.list = list
		},

		removeAll () {
			const list = []

			for (const item of this.list) {
				if (!item.done) {
					list.push(item)
					item.id = list.length
				}
			}

			this.list = list
		}
	},

	computed: {
		selected () {
			for (const item of this.list) {
				if (item.selected)
					return true
			}

			return false
		},

		mode () {
			if (this.list.length < 1) {
				return 'normal'
			}

			for (const item of this.list) {
				if (!item.selected)
					return 'normal'
			}

			return 'edit'
		}
	}
})