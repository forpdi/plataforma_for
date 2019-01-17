import React from "react";
import ForPDIChart from "forpdi/jsx/core/widget/ForPDIChart.jsx"
import DashboardStore from "forpdi/jsx/dashboard/store/Dashboard.jsx";
import PlanStore from "forpdi/jsx/planning/store/Plan.jsx";
import PlanMacroStore from "forpdi/jsx/planning/store/PlanMacro.jsx";
import UnitStore from "forpdi/jsx_forrisco/planning/store/Unit.jsx";
import string from 'string';
import Modal from "forpdi/jsx/core/widget/Modal.jsx";
import LoadingGauge from "forpdi/jsx/core/widget/LoadingGauge.jsx";
import Messages from "forpdi/jsx/core/util/Messages.jsx";
import moment from 'moment'

import annotation from 'chartjs-plugin-annotation';

var numeral = require('numeral');

Array.prototype.unique = function() {
	return this.filter(function (value, index, self) {
	  return self.indexOf(value) === index;
	});
  }

export default React.createClass({
  getInitialState() {
    return {
		plan: null,
		risks:[],
		units:[],
		incidents:[],
		unit:-1,
        loading: true,
		year: [],
        data: [],
        options:{
            title: '',
			hAxis: {title: "Tempo", minValue: 0, maxValue: 15, },
            vAxis: {title: 'Quantidade', minValue: 0, maxValue: 15},
            legend: true,
            explorer: {axis: 'horizontal'},
			bar: {groupWidth: '50%'},
			colors:["red","blue"],
        },
        thematicAxes:[],
        selectedThematicAxes: -1,
        chartEvents: [
            {
                eventName : 'select',
                callback  : this.onChartClick
            },
        ],
		pageSize: 10,
		request:false
    };
  },

	componentDidMount() {
		var me = this;


		this.state.year.push((new Date).getFullYear())

		UnitStore.on("findIncident	",(model) =>{
			//this.state.incidents=[]
			//console.log("findIncidents",model)
			for(var i=0;i< model.data.length;i++){
				this.state.incidents.push(model.data[i])
				var data=moment(model.data[i].begin,'DD/MM/YYYY hh:mm:ss').toDate();
				this.state.year.push(data.getFullYear(),)
			}


			this.state.year=this.state.year.unique();

			this.setState({
				incidents:this.state.incidents,
				year:this.state.year
			})

			this.state.unit=-1

			this.LoadIncidents((new Date).getFullYear(),this.state.unit)
		},me);


	},

	componentWillReceiveProps(newProps){
		var me = this;

		this.state.plan=newProps.plan
		this.setState({
			plan: newProps.plan,
			risks: newProps.risks,
			units: newProps.units,
			loading: true,
		});

		if(!this.state.request){
			for(var i=0; i<newProps.units.length; i++){
				this.state.request=true
				UnitStore.dispatch({
					action: UnitStore.ACTION_FIND_INCIDENTS,
					data:newProps.units[i].id
				});
			}
		}
	},


  onThematicAxesChange(){
    this.getInfo(1, this.state.pageSize);
  },


  onChartClick(Chart){
	var me = this;

/*	console.log("ano", this.refs['selectYear'].value)
	console.log("mes", this.state.data[Chart.chart.getSelection()[0].row+1][0])
	console.log("coluna", Chart.chart.getSelection()[0].column)
	console.log("quantidade",this.state.data[Chart.chart.getSelection()[0].row+1][Chart.chart.getSelection()[0].column])
*/
    if(Chart.chart.getSelection().length > 0){
        var url = window.location.origin+window.location.pathname+"#/forrisco/risk/";
		var msg = Messages.get("label.askGoToSelectedLevel");

        Modal.confirmCustom(() => {
			Modal.hide();
			location.assign(url+
				"?ano="+this.refs['selectYear'].value+
				"&mes="+this.state.data[Chart.chart.getSelection()[0].row+1][0]+
				"&coluna="+Chart.chart.getSelection()[0].column+
				"&quantidade="+this.state.data[Chart.chart.getSelection()[0].row+1][Chart.chart.getSelection()[0].column]);
        },msg,
        ()=>{
            Chart.chart.setSelection([]);
            Modal.hide();
        });
	}
  },

  getInfo(page, pageSize, opt){

  },

onUnitChange(evnt){
	this.state.unit=this.refs['selectUnits'].value
	this.LoadIncidents(this.refs['selectYear'].value,this.state.unit)
},

onYearChange(){
	this.onUnitChange();
},


LoadIncidents(year, unit){

	var data=[]
	var incidents=[]
	var mes={0:'jan',1:'fev',2:'mar',3:'abr',4:'mai',5:'jun',6:'jul',7:'ago',8:'set',9:'out',10:'nov',11:'dez'}
	var month_thr={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0}
	var month_opp={0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0}

	for(var i=0; i< this.state.incidents.length;i++){
		if(moment(this.state.incidents[i].begin,'DD/MM/YYYY hh:mm:ss').toDate().getFullYear() == year){

			if(unit == -1){
				incidents.push(this.state.incidents[i])
			}else{
				if(unit== this.state.incidents[i].unitId){
					incidents.push(this.state.incidents[i])
				}
			}
		}
	}


	for(i=0;i<incidents.length;i++){

		var this_month=moment(incidents[i].begin,'DD/MM/YYYY hh:mm:ss').toDate().getMonth()

		if(incidents[i].type==0){
			month_thr[this_month]+=1
		}else{
			month_opp[this_month]+=1
		}
	}

	var month
	if(year==(new Date).getFullYear()){
		month=(new Date).getMonth()
	}else{
		month=12
	}

	data.push(['mes', 'ameaças', 'oportunidades'])
	for(var i=0;i<month+1;i++){
		data.push([mes[i], month_thr[i], month_opp[i]])
	}

	this.setState({
		data:data,
		loading:false
	})
},

  render() {
    return (<div>
			<div className="panel panel-default">
				<div className="panel-heading dashboard-panel-title">
					<b className="budget-graphic-title" title={Messages.get("label.incidents")}>{Messages.get("label.incidents").toUpperCase()}</b>
					<span className="frisco-containerSelect"> {Messages.get("label.units")}
                     <select onChange={this.onUnitChange} className="form-control dashboard-select-box-graphs marginLeft10" ref="selectUnits">
						 <option value={-1} data-placement="right" title={Messages.get("label.viewAll_")}> {Messages.get("label.viewAll_")} </option>
                         {this.state.units.map((attr, idy) =>{
                             return(
							 <option  key={attr.id} value={attr.id} data-placement="right" title={attr.name}>
                                     {(attr.name.length>20)?(string(attr.name).trim().substr(0, 20).concat("...").toString()):(attr.name)}
                            </option>);})
                        }
                     </select>
					</span>
				</div>
				<br/>
				<div style={{"text-align": "center"}}>
					<select onChange={this.onYearChange} className="form-control dashboard-select-box-graphs marginLeft10" ref="selectYear">
                        {this.state.year.map((attr, idx) =>{
                            return(
							<option key={idx} value={attr} data-placement="right" title={attr}>{attr}</option>);})
                        }
                     </select>
				</div>
                {this.state.loading ? <LoadingGauge/> :
                    <div>
                        <ForPDIChart
                            chartType="LineChart"
                            data={this.state.data}
                            options={this.state.options}
                            graph_id="LineChart"
                            width="100%"
                            height="300px"
                        	legend_toggle={false}
                            pageSize={this.state.pageSize}
                            total={this.state.total}
                            onChangePage={this.getInfo}
                            chartEvents={this.state.chartEvents} />
                        <div className="colaborator-goal-performance-legend">
                            <span className="legend-item"><input type="text"  className="legend-risk-threats marginLeft10" disabled/> {Messages.getEditable("label.risk.threats","fpdi-nav-label")}</span>
                            <span className="legend-item"><input type="text"  className="legend-risk-opportunities marginLeft10" disabled/> {Messages.getEditable("label.risk.opportunities","fpdi-nav-label")}</span>
                        </div>
                    </div>
				}
        </div>
		</div>
    );
  }

});
