import { TabAddVehicle } from './TabAddVehicle';
import { TabAdminVehicle } from './TabAdminVehicle';
import { useTabs } from '../hooks/useTabs';
import '../index.css';

const stateInit =  {
  add : "",
  admin :"",
}

function TabsContainer() {

  const {state,changeState} = useTabs(stateInit,"add");

    return (
      
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">

            <ul className="nav nav-pills nav-justified">
              <li className="nav-item" onClick={()=>changeState("add")}>
                <span className={`nav-link ${state.add}`} aria-current="page">Nuevo</span>
              </li>
              <li className="nav-item" onClick={()=>changeState("admin")}>
                <span className={`nav-link ${state.admin}`} >Gestionar</span>
              </li>
            </ul>

            <div className="tab-content">
              <div className={`tab-pane ${state.add}`} id="home" role="tabpanel" aria-labelledby="home-tab">
                <TabAddVehicle/>
              </div>
              <div className={`tab-pane ${state.admin}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                <TabAdminVehicle/>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}

export default TabsContainer;