class DOMHelper {
  static clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationElement = document.querySelector(newDestinationSelector);
    destinationElement.append(element);
  }
}

class Component {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) {
      this.element.remove();
      // this.element.parentElement.removeChild(this.element);
    }
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}

class Tooltip extends Component {
  constructor(closeNotifierFunction) {
    super();
    this.closeNotifier = closeNotifierFunction;
    this.create();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    tooltipElement.textContent = 'DUMMY!';
    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}

class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFunction, type) {
    this.id = id;
    // 잠재적으로 버튼이 눌릴 경우 finished <-> active로 전환해줄 함수를 연결한다.
    this.updateProjectListsHandler = updateProjectListsFunction;
    this.connectMoreInfoButton(); // 동적으로 변화하지 않는 함수.
    this.connectSwitchButton(type); // 해당 타입에 따라 상태를 전환하는 함수를 변경해주어야 하므로 type 식별자를 함께 넘겨준다.
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltip = new Tooltip(() => {
      this.hasActiveTooltip = false;
    });
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector( // 첫번째 버튼이 info라는 것을 가정.
      'button:first-of-type'
    );
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler);
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListsFn, type) {
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectSwitchButton(type);
  }
}

// active와 finish가 내부적으로 동일한 구조를 갖게하여 하나의 클래스를 공유할 수 있도록 함.
class ProjectList {
  // 필드에 project 박스들을 담아줄 배열을 선언해준다.
  projects = [];

  // 두 가지 타입이 있기 때문에 active인지 finished인지 구분해줄 type을 선언해준다.
  constructor(type) {
    this.type = type;
    // css 선택자를 사용하여, 미리 정의된 요소들을 모두 로드하여 prjItems에 보내준다.
    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      // 배열에 하나씩 담아준다.
      this.projects.push(
        // 각 요소들의 구성요소도 동일하므로 ProjectItem 클래스로 관리해준다.
        // 해당 프로젝트의 돔 요소들은 고유한 id를 가지고 있으므로 삽입해준다.
        new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
  }

  setSwitchHandlerFunction(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }

  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find(p => p.id === projectId));
    this.projects = this.projects.filter(p => p.id !== projectId);
  }
}

class App {
  //instance화 할 필요가 없기 때문에 static으로 불러줄 App.init()을 만들었다.
  static init() {
    const activeProjectsList = new ProjectList('active'); // active에 있는 돔 요소(li)를 저장해주기 위함
    const finishedProjectsList = new ProjectList('finished'); // finished에 있는 돔 요소(li)를 저장해주기 위함.
    activeProjectsList.setSwitchHandlerFunction( // active는 finish 버튼을 통해 finish 항목으로 돔 요소를 전송해주어야 함.
      finishedProjectsList.addProject.bind(finishedProjectsList) // addProject에 옮겨 줄 돔 객체를 바인딩 해준다.
    );
    finishedProjectsList.setSwitchHandlerFunction( // finish는 active 버튼을 통해 active 항목으로 돔 요소를 전송해주어야 함.
      activeProjectsList.addProject.bind(activeProjectsList) // 또한 옮겨줄 객체를 바인딩 해준다.
      /**
       * [bind를 사용하는 이유]
       * 
       * 이벤트 함수가 호출이 될 때, 적용시킬 객체를 넘겨주어야 한다.
       * 이벤트 함수는 this가 해당 이벤트 전역 객체로 바인딩 되어있기 때문에 bind를 통해 적용시킬 객체를 보내주어야 한다.
      */
    );
  }
}

App.init();
