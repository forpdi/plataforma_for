import React from "react";
import {Chart} from 'react-google-charts';
import Observables from "forpdi/jsx/core/util/Observables.jsx"
import LoadingGauge from "forpdi/jsx/core/widget/LoadingGauge.jsx";

export default React.createClass({

	getInitialState() {
        return {
			page: 1,
			cont: 0
        }
    },

    getDefaultProps(){
    	return {
            total: 0,
            pageSize: 5
        }
    },

    componentWillReceiveProps(newProps){
        newProps.options.chartArea = {
            width: '65%'
        };

		this.state.cont=0
    },

    remount(){
		this.forceUpdate();
    },

    componentDidMount() {
    	Observables.ResizeMenu.subscribe(this.remount);
	},


    changePage(page){
        var lastPage = Math.ceil(this.props.total/this.props.pageSize);
        if(page > lastPage){
            page = 1;
        } else if (page <= 0){
            page = lastPage;
        }
        this.state.page = page;
        this.props.onChangePage(page, this.props.pageSize);
    },

    render(){

		//forçar renderização para expandir gráfico dentro do modal
		if(this.state.cont<5){
			this.state.cont+=1
			setTimeout(()=>{this.forceUpdate()}, 50)
		}

		return(
			<div>
				{this.total > this.props.pageSize ?
				<div className="dashboard-graph-pagination">
					<i onClick={this.changePage.bind(this, Number(this.state.page - 1))}
					className="dashboard-previews-icon mdi mdi-arrow-left-bold" />
					<i onClick={this.changePage.bind(this, Number(this.state.page + 1))}
					className="dashboard-next-icon mdi mdi-arrow-right-bold" />
				</div> : undefined}
				<div>
					<Chart
					 chartType= {this.props.chartType}
					 data={this.props.data}
					 options={this.props.options}
					 graph_id={this.props.graph_id}
					 width={this.props.width}
					 height={this.props.height}
					 legend_toggle={this.props.legend_toggle}
					 chartEvents={this.props.chartEvents || []}
					 loader={<div><LoadingGauge/></div>}
					/>
				</div>
			</div>
		);
    }
});
