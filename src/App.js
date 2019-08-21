import React, {Component} from 'react';
import './css/App.css';
import Select from 'react-select';

import Data from './data/data.json'

const teams = [
  { value: 'Desafinity', label: 'Desafinity' },
  { value: 'Keywork', label: 'Keywork' },
  { value: 'Gravity', label: 'Gravity' },
  { value: 'Insanity', label: 'Insanity' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const clients = [
  { value: 'Kindaloo', label: 'Kindaloo' },
  { value: 'Buzzness', label: 'Buzzness' },
  { value: 'Tersanki', label: 'Tersanki' },
  { value: 'Qiao', label: 'Qiao' },
  { value: 'Maxemia', label: 'Maxemia' },
  { value: 'Incubus', label: 'Incubus' },
  { value: 'Datagen', label: 'Datagen' }
];


class App extends Component {

constructor(props) {
    super(props);
    this.state = {
      data: [],
      filtered: [],
      clientsSelected: [],
      clientesEscolhidos: [],
      stateSelected: '1',
    };
    this.filterOptions = this.filterOptions.bind(this);
    this.clientChange = this.clientChange.bind(this);
  }

  /*
 componentDidMount() {

   fetch('./data/data.json', {
     method: 'get',
     headers : {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     }

   })
       .then((res) => res.json())
       .then((data) => {
         console.log('data:', data);
         this.setState({
           data: data
         });
       });

 }*/

  componentDidMount () {
    this.setState({
      data: Data,
    })
  }


  //client options selected
  clientChange = selectedOption => {
    const clientOption = this.state;

      //console.log(JSON.stringify(selectedOption));

      clientOption.clientsSelected = [];

      selectedOption.forEach((option) => {
        clientOption.clientsSelected.push(option.label);
      });


      this.setState({
        clientesEscolhidos: clientOption.clientsSelected,
      });

    console.log(`OPCOES SELECIONADAS:`, JSON.stringify(clientOption.clientsSelected));
  };

  // Filter
  filterOptions() {

    let currentList = [];
    let newList = [];
    let stateSelected = "";

    currentList = Data;

    console.log(`VALOR PARA COMPARAR:`, JSON.stringify(this.state.clientesEscolhidos));
    console.log(`STATE PARA COMPARAR:`,document.querySelector('input[name=option]:checked').value);
    const stateValue = document.querySelector('input[name=option]:checked').value;
    if (stateValue === "option1"){
      stateSelected = "In Progress";
    }else if(stateValue === "option2"){
      stateSelected = "Rejected";
    }else{
      stateSelected = "";
    }

    // FILTRAR POR CLIENTE
    /*newList = currentList.filter(item => {
      return item.client === "Kindaloo";
      /!*return item.client === "Kindaloo";*!/
    });*/

    newList = currentList.filter(item => {
        return item.state === stateSelected;
    });

    this.setState({
      data: newList,
    });
  }



  render() {
    const {data} = this.state;
    const { selectedOption } = this.state;
      return (


        <div className="">


          <div className="keywork-topbar-img"/>
          <div className="keywork-leftbar-img"/>


          <div className="container">
            <div className="row">

                <div className="col-12 filter-container d-flex justify-content-start flex-wrap">


                  <div className="filter-toggle">
                    <div className="filter-name">Candidates</div>

                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                      <label className="btn btn-outline-light active">
                        <input type="radio" name="option1" id="option1" value="1" autoComplete="off" checked/> All
                      </label>
                      <label className="btn btn-outline-light">
                        <input type="radio" name="option2" id="option2" value="2" autoComplete="off"/> My
                      </label>
                    </div>
                  </div>


                  <div className="filter">
                  <div className="filter-name">State</div>

                  <Select
                      name="colors"
                      options={teams}
                      className="basic-multi-select"
                      classNamePrefix="States"
                  />
                  </div>

                  <div className="filter">
                  <div className="filter-name">Teams</div>

                  <Select
                      defaultValue={[teams[2], teams[3]]}
                      isMulti
                      name="colors"
                      options={teams}
                      className="basic-multi-select"
                      classNamePrefix="Any teams"
                  />
                  </div>

                  <div className="filter">
                    <div className="filter-name">Client</div>

                    <Select
                        value={selectedOption}
                        defaultValue="Clients"
                        isMulti
                        name="colors"
                        options={clients}
                        className="basic-multi-select"
                        classNamePrefix="Clients"
                        onChange={this.clientChange}
                    />
                  </div>

                  <div className="filter-toggle">
                    <div className="filter-name">State</div>

                    <div id="toogleBtn" className="btn-group btn-group-toggle" data-toggle="buttons">
                      <label className="btn btn-outline-light">
                        <input type="radio" name="option" id="option1" value="option1" autoComplete="off"
                               checked={this.state.stateSelected === 'option1'}
                               onChange={(e) => this.setState({ stateSelected: e.target.value })}
                        />
                        In Progress
                      </label>
                      <label className="btn btn-outline-light">
                        <input type="radio" name="option" id="option2" value="option2" autoComplete="off"
                               checked={this.state.stateSelected === 'option2'}
                               onChange={(e) => this.setState({ stateSelected: e.target.value })}
                        />
                        Rejected
                      </label>
                    </div>
                  </div>


                  <div className="filter">
                    <div className="filter-name">Opportunities</div>

                    <Select
                        defaultValue={[{ value: 'Open', label: 'Open' }]}
                        name="colors"
                        options={[
                                  { value: 'Open', label: 'Open' },
                                  { value: 'Closed', label: 'Closed' }
                                  ]}
                        className="basic-multi-select"
                        classNamePrefix="Clients"
                    />
                  </div>

                  <div className="vertical-line"/>

                  <div className="filter-btn">
                    <div className="filter-name">Invisible text</div>
                    <button type="button" className="btn btn-primary" onClick={this.filterOptions}>Apply filter<i className="apply-filters-icon"/></button>
                  </div>
                  <div className="filter-btn">
                    <div className="filter-name">Invisible text</div>
                    <button type="button" className="btn btn-primary" disabled>Clear all<i  className="clean-filters-icon"/></button>
                  </div>

                </div>

            </div>
          </div>

              <div className="container pt-3">
                <div className="row">
                  <div className="col-12">
                    <div className="">
                      <table className="">

                        <div className="row all-table">

                        <div className="col-md-3 col-6 fixed-table">


                          <thead className="tb-header thead-left">
                          <tr>
                            <th/>
                            <th>State</th>
                            <th>Name&nbsp;&nbsp;<span className="fa fa-angle-down"/></th>
                          </tr>
                          </thead>



                          {data.map(item => (

                              <tbody key={item.id}>

                              <tr className="tb-tx-normal">
                                <td className="see-more">...</td>
                                <td className="green">Placed&nbsp;&nbsp;<span className="fas fa-check-circle"/></td>
                                <td>
                                    <td className="user-picture">
                                      <img alt="" src="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png" height="40" width="40" />
                                    </td>
                                    <td>
                                      <div className="tb-tx-name">{item.name}</div>
                                      <div className="tb-tx-exp">Potential B  | {item.experience} Years</div>
                                    </td>
                                </td>
                              </tr>
                              </tbody>



                          ))}

                          <tfoot className="tb-footer tfoot-left">
                          <tr>
                            <th/>
                            <th>45%</th>
                            <th/>
                          </tr>
                          </tfoot>

                        </div>



                        <div className="col table-responsive">

                          <thead  className="tb-header thead-right">
                          <tr>
                            <th>Areas&nbsp;&nbsp;<span className="fa fa-angle-down"/></th>
                            <th>Manager&nbsp;&nbsp;<span className="fa fa-angle-down"/></th>
                            <th>Client&nbsp;&nbsp;<span className="fa fa-angle-down"/></th>
                            <th>Opportunity&nbsp;&nbsp;<span className="fa fa-angle-down"/></th>
                            <th>Rate&nbsp;&nbsp;<span className="fa fa-angle-down"/></th>
                            <th>Zones&nbsp;&nbsp;<span className="fa fa-angle-down"/></th>
                            <th>Salary&nbsp;&nbsp;<span className="fa fa-angle-down"/></th>
                            <th>Last modification&nbsp;&nbsp;<span className="fa fa-angle-down"/></th>
                          </tr>
                          </thead>


                          {data.map(item => (

                              <tbody key={item.id}>

                              <tr className="tb-tx-normal">
                                <td>{item.areas}</td>
                                <td>{item.manager}</td>
                                <td className="text-highlight">{item.client}</td>
                                <td className="text-highlight">{item.opportunity}</td>
                                <td>{item.rate}</td>
                                <td>{item.zones}</td>
                                <td>
                                  <div>{item.salary.min}</div>
                                  <div>{item.salary.max}</div>
                                </td>
                                <td>
                                    <div>{item.last_mod.autor}</div>
                                    <div>{item.last_mod.date}</div>
                                </td>
                              </tr>
                              </tbody>

                          ))}

                          <tfoot className="tb-footer tfoot-left">
                          <tr>
                            <th>6 Results</th>
                            <th/>
                            <th>4 Clients</th>
                            <th/>
                            <th>~6,40€</th>
                            <th/>
                            <th>~2 000,00 €</th>
                            <th/>
                          </tr>
                          </tfoot>

                        </div>

                          <tfoot className="tb-footer">
                          <div className="page-lister">
                            <div className="btn-page">First</div>
                            <div className="btn-page">
                              <div className="btn-back-forward fa fa-angle-left"/>
                              <div className="btn-back-forward page-number">1</div>
                              <div className="btn-back-forward fa fa-angle-right"/>
                            </div>
                            <div className="btn-page">Last</div>
                            <div className="btn-page">0  -  4 of 4 results</div>
                            <div className="btn-page">results per page  10&nbsp;&nbsp;<span className="fa fa-angle-down"/></div>
                          </div>
                          </tfoot>


                        </div>



                      </table>
                    </div>
                  </div>
                </div>
              </div>


        </div>




    );
  }
}

export default App;
