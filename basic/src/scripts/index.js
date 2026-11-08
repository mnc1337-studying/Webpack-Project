import { debounce } from 'lodash-es'
import '../styles/index.css'

const output = document.getElementById('output')
const showWidth = () => {
    output.textContent = `Поточна ширина вікна (тестова фіча): ${window.innerWidth}px`
}

showWidth()
window.addEventListener('resize', debounce(showWidth, 200))