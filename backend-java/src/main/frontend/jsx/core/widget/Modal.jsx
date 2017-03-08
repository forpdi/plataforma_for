
import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import FeedbackPost from "forpdi/jsx/core/widget/contact/FeedbackPost.jsx";
import ReportProblem from "forpdi/jsx/core/widget/contact/ReportProblem.jsx";

var EL = document.getElementById("main-global-modal");

var AlertModal = React.createClass({
	render() {
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body">
	        			<p>{this.props.message}</p>
	      			</div>
	      			<div className="modal-footer fpdi-modal-footer">
	        			<button type="button" className="btn btn-sm btn-default" data-dismiss="modal">Ok</button>
	      			</div>
				</div>
			</div>
		);
	}
});

var ConfirmModal = React.createClass({
	/*render() {
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content">
					<div className="modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
	      			</div>
	      			<div className="modal-body">
	        			{this.props.message}
	      			</div>
	      			<div className="modal-footer">
	        			<button type="button" className="btn btn-sm btn-default" data-dismiss="modal">Cancelar</button>
	        			<button type="button" className="btn btn-sm btn-primary" onClick={this.props.onConfirm}>Confirmar</button>
	      			</div>
				</div>
			</div>
		);
	}*/

	getDefaultProps() {
		return {
			confirmText: "Ok"
		};
	},
	render() {
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content fpdi-modal-confirmCustom">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onConfirm}><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title centerTitleModalCompleteGoal" id="myModalLabel"><i className="mdi mdi-confirmModalCustom mdi-48px mdi-checkbox-marked-circle" id="modalIcon"></i> Confirmação</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body-close-goal">
	        			<p id>{this.props.message}</p>
	      			</div>
	      			<div className="modal-footer fpdi-modal-footer">
	      				<button type="button" className="btn btn-sm btn-success modal-button" onClick={this.props.onConfirm}>{this.props.confirmText}</button>
	      			</div>
				</div>
			</div>
		);
	}
});

var ConfirmModalCustom = React.createClass({
	getDefaultProps() {
		return {
			confirmText: "Sim",
			declineText: "Não"
		};
	},
	render() {
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content fpdi-modal-confirmCustom">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title centerTitleModalCompleteGoal" id="myModalLabel"><i className="mdi mdi-confirmModalCustom mdi-48px mdi-checkbox-marked-circle" id="modalIcon"></i> Confirmação</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body-close-goal">
	        			<p id>{this.props.text}</p>
	      			</div>
	      			<div className="modal-footer fpdi-modal-footer">
	      				<button type="button" className="btn btn-sm btn-success modal-button" onClick={this.props.onConfirm}>{this.props.confirmText}</button>
	        			<button type="button" className="btn btn-sm btn-default modal-button" onClick={this.props.onCancel} >{this.props.declineText}</button>
	      			</div>
				</div>
			</div>
		);
	}
});



var ConfirmConviteUser = React.createClass({
	render() {
		var msg1 = "Um e-mail de convite foi enviado para ";
		var msg2 = ", no qual o usuário precisa completar o cadastro.";
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content fpdi-modal-confirmCustomUser">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title centerTitleModalCompleteGoal" id="myModalLabel">Confirmação</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body-close-goal modal-content-confirmUser">
						<p id> {msg1}<strong>{this.props.text}</strong>{msg2}</p>
	      			</div>
				</div>
			</div>
		);
	}
});

var CancelModalCustom = React.createClass({
	getDefaultProps() {
		return {
			confirmText: "Sim",
			declineText: "Não"
		};
	},
	render() {
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content fpdi-modal-confirmCustom">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			 <h4 className="modal-title centerTitleModalCompleteGoal" id="myModalLabel"><i className=" mdi-cancelModalCustom mdi mdi-alert-circle" id="modalIcon"> </i> Alerta</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body-close-goal">
	        			<p id>{this.props.text}</p>
	      			</div>
	      			<div className="modal-footer fpdi-modal-footer">
	      				<button type="button" className="btn btn-sm btn-success modal-button" id = "cancelModalCustom" onClick={this.props.onConfirm}>{this.props.confirmText}</button>
	        			<button type="button" className="btn btn-sm btn-default modal-button" onClick={this.props.onCancel} >{this.props.declineText}</button>
	      			</div>
				</div>
			</div>
		);
	}
});

var DeleteConfirmModal = React.createClass({
	getDefaultProps() {
		return {
			text: "Você tem certeza que deseja excluir esse registro?",
			confirmText: "Excluir",
			declineText: "Cancelar"
		};
	},
	render() {
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">Atenção</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body">
	        			<p>{this.props.text}</p>
	      			</div>
	      			<div className="modal-footer fpdi-modal-footer">
	        			<button type="button" className="btn btn-sm btn-default" data-dismiss="modal">{this.props.declineText}</button>
	        			<button type="button" className="btn btn-sm btn-primary" onClick={this.props.onConfirm}>{this.props.confirmText}</button>
	      			</div>
				</div>
			</div>
		);
	}
});

var DeleteConfirmModalCustom = React.createClass({
	getDefaultProps() {
		return {
			confirmText: "Excluir",
			declineText: "Cancelar"
		};
	},
	render() {
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">Atenção</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body">
	        			<p>{this.props.text}</p>
	      			</div>
	      			<div className="modal-footer fpdi-modal-footer">
	        			<button type="button" className="btn btn-sm btn-default" data-dismiss="modal">{this.props.declineText}</button>
	        			<button type="button" className="btn btn-sm btn-primary" onClick={this.props.onConfirm}>{this.props.confirmText}</button>
	      			</div>
				</div>
			</div>
		);
	}
});




var ConcludeGoalModalCustom = React.createClass({
	getDefaultProps() {
		return {
			confirmText: "Confirmar",
			declineText: "Cancelar"
		};
	},
	render() {
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title centerTitleModalCompleteGoal" id="myModalLabel">Confirmação</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body-close-goal">
	        			<p id>{this.props.text}</p>
	      			</div>
	      			<div className="modal-footer fpdi-modal-footer">
	        			<button type="button" className="btn btn-sm btn-default" data-dismiss="modal">{this.props.declineText}</button>
	        			<button type="button" className="btn btn-sm btn-success" onClick={this.props.onConfirm}>{this.props.confirmText}</button>
	      			</div>
				</div>
			</div>
		);
	}
});


var ReadTextModal = React.createClass({
	onConfirmWrapper(evt) {
		var me = this,
			value = me.refs['text-input'].value;
		_.defer(() => {
			me.props.onConfirm(value);
		});
	},
	render() {
		return (
			<div className="modal-dialog modal-sm">
				<div className="modal-content">
					<div className="modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
	      			</div>
	      			<div className="modal-body">
	        			<p>{this.props.message}</p>
	        			<input type='text' className='form-control' ref="text-input" />
	      			</div>
	      			<div className="modal-footer">
	        			<button type="button" className="btn btn-sm btn-default" data-dismiss="modal">Cancelar</button>
	        			<button type="button" className="btn btn-sm btn-primary" onClick={this.onConfirmWrapper}>Confirmar</button>
	      			</div>
				</div>
			</div>
		);
	}
});

var FileUploadModal = React.createClass({
	render() {
		return (
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body">
	        			<div>{this.props.message}</div>
	        			<input type='file' name="file" className='form-control' ref="file-upload-field" id="file-upload-field" accept={this.props.type}/>
	        			<span id="upload-error-span" className="upload-error"/>
	      			</div>
	      			<div className="modal-footer fpdi-modal-footer">
	        			<div id="file-upload-progress" className="progress" style={{border: '1px solid #ccc'}}>
		        			<div className="progress-bar progress-bar-success"></div>
		    			</div>
	      			</div>
				</div>
			</div>
		);
	}
});

var FileReaderModal = React.createClass({

	render() {
		return (
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body">
	        			<div>{this.props.message}</div>
	        			<input type='file' name="file" className='form-control' ref="file-reader-field" id="file-reader-field" accept={this.props.type} onChange={this.props.onSuccess}/>
	        			<span id="upload-error-span" className="upload-error"/>
	      			</div>
	      			<div className="modal-footer fpdi-modal-footer">
	        			<div id="file-reader-progress" className="progress" style={{border: '1px solid #ccc'}}>
		        			<div className="progress-bar progress-bar-success"></div>
		    			</div>
	      			</div>
				</div>
			</div>
		);
	}
});

var MediumModal = React.createClass({
	getDefaultProps() {
		return {
			title: null
		};
	},
	render() {
		return (
			<div className="modal-dialog modal-md">
				<div className="modal-content">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body">
	        			{this.props.children}
	      			</div>
				</div>
			</div>
		);
	}
});

var ExportDocumentModal = React.createClass({
	render() {
		return (
			<div className="modal-dialog modal-md">
				<div className="modal-content">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
	      			</div>
	      			<hr className="divider"></hr>
	      			<div className="modal-body fpdi-modal-body">
	      				<form>
		      				<div className="col-md-6">
			        			<label htmlFor="documentTitle">Título do documento <span className="fpdi-required">&nbsp;</span>
			        				<input type='text' name="documentTitle" ref="documentTitle" id="documentTitle" />
			        			</label>
			        			
			        		</div>
			        		<div className="col-md-6">
			        			<label htmlFor="documentAuthor">Autor <span className="fpdi-required">&nbsp;</span>
			        				<input type='text' name="documentAuthor"  ref="documentAuthor" id="documentAuthor" />
			        			</label>
	      					</div>
	      					<div className="col-md-12" >
		      					<label htmlFor="container"> Selecione as seções que deseja incluir no documento: <span className="fpdi-required">&nbsp;</span></label>
		      					<div className="container" id="container">
		      						{this.props.text}	
								</div>
							</div>								
							<br/>
							<div className="col-md-12" >
								<label className="paddingTop5">As seções vazias não serão exportadas.</label>
							</div>
							<div id="exportDocumentModalFooter" name="exportDocumentModalFooter">
								<p id="paramError" className="exportDocumentError"></p>
								<p className="help-block">
									<span className="fpdi-required" /> Campos obrigatórios.
								</p>
	        					<button type="button" className="btn btn-sm btn-success"  onClick={this.props.onConfirm}>Exportar</button>
	        					<button type="button" className="btn btn-sm btn-default" data-dismiss="modal">Cancelar</button>
	        				</div>
	      				</form>
	      			</div>
				</div>
			</div>
		);
	}
});

var ImportUsersModal = React.createClass({
	render() {
		return (
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header fpdi-modal-header">
	        			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        			<h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
	      			</div>
	      			<div className="modal-body fpdi-modal-body">
	      				<p id="paramError" className="importUsersWarning"><strong>Atenção: </strong> Não esqueça de atribuir o tipo de conta adequado para cada usuário importado.</p>
							{this.props.text}
						<div id="importUserstModalFooter" name="importUserstModalFooter">
								<p id="paramError" className="importUsersWarning"></p>
	        					<button type="button" className="btn btn-sm btn-success"  onClick={this.props.onConfirm}>Importar</button>
	        					<button type="button" className="btn btn-sm btn-default" data-dismiss="modal">Cancelar</button>
	        				</div>
	      			</div>
				</div>
			</div>
		);
	}
});

var Modal = {
	$el: EL,
	$init() {
		$(this.$el).modal({
			show: false
		});
	},
	hide() {
		$(this.$el).modal("hide");
		_.defer(() => {
			ReactDOM.render((
				<div></div>
			),this.$el);
		});
	},
	show() {
		$(this.$el).modal("show");
	},
	detailsModal(title, Components) {
		ReactDOM.render((
			<MediumModal title={title}>
				{Components}
			</MediumModal>
		),this.$el);
		$(this.$el).modal('show');
	},
	alert(title, msg) {
		ReactDOM.render((
			<AlertModal title={title} message={msg} />
		),this.$el);
		$(this.$el).modal('show');
	},
	confirm(title, msg, cb) {
		ReactDOM.render((
			<ConfirmModal onConfirm={cb}  title={title} message={msg} />
		),this.$el);
		$(this.$el).modal('show');
	},
	confirmCustom(cb, text, cd) {
		ReactDOM.render((
			<ConfirmModalCustom onConfirm={cb} text={text} onCancel = {cd}/>
		),this.$el);
		$(this.$el).modal('show');	
	},

	confirmConviteUserCustom(text) {
		ReactDOM.render((
			<ConfirmConviteUser text={text} />
		),this.$el);
		$(this.$el).modal('show');	
	},

	confirmCancelCustom(cb, text, cd) {
		ReactDOM.render((
			<CancelModalCustom onConfirm={cb} text={text} onCancel = {cd}/>
		),this.$el);
		$(this.$el).modal('show');	
	},

	deleteConfirm(cb) {
		ReactDOM.render((
			<DeleteConfirmModal onConfirm={cb} />
		),this.$el);
		$(this.$el).modal('show');
	},
	deleteConfirmCustom(cb, text) {
		ReactDOM.render((
			<DeleteConfirmModalCustom onConfirm={cb} text={text}/>
		),this.$el);
		$(this.$el).modal('show');
	},
	completeGoalCustom(cb, text) {
		ReactDOM.render((
			<ConcludeGoalModalCustom onConfirm={cb} text={text}/>
		),this.$el);
		$(this.$el).modal('show');	
	},
	readText(title, msg, cb) {
		ReactDOM.render((
			<ReadTextModal title={title} message={msg} onConfirm={cb} />
		),this.$el);
		$(this.$el).modal('show');
	},

	feedbackPost() {
		ReactDOM.render((
			<MediumModal title="Enviar feedback">
				<FeedbackPost
					onCancel={this.hide.bind(this)}
					onSubmit={this.hide.bind(this)}
				/>
			</MediumModal>
		),this.$el);
		$(this.$el).modal('show');
	},
	reportProblem() {
		ReactDOM.render((
			<MediumModal title="Reportar problema">
				<ReportProblem
					onCancel={this.hide.bind(this)}
					onSubmit={this.hide.bind(this)}
				/>
			</MediumModal>
		),this.$el);
		$(this.$el).modal('show');
	},

	uploadFile(title, msg, url, fileType, typesBlocked, onSuccess, onFailure, validSamples, maxSize) {
		var me = this;
		var format = "";
		var sizeExceeded = false;
		var typeViolation = false;
		if(maxSize){
			maxSize *= 10e5;
		}
		ReactDOM.render((
			<FileUploadModal title={title} message={msg} type={fileType}/>
		),this.$el);
		document.getElementById('upload-error-span').innerHTML = "";
		this.show();

		var uploadOptions = {
	        url: url,
	        dataType: 'json',
	        beforeSend : function(xhr, opts) {	        	
				format = this.files[0].name.substring(this.files[0].name.lastIndexOf(".")+1, this.files[0].name.length); 
	        	if ((!(this.files[0].type.toLowerCase().match(fileType)) && !(format.toLowerCase().match(fileType))) 
	        			|| format.toLowerCase().match(typesBlocked)) { //|| this.files[0].type.toLowerCase().match(typesBlocked)
	        		if (!this.files[0].type.toLowerCase().match(fileType) || this.files[0].type.toLowerCase().match(typesBlocked))
	        			format = this.files[0].type.split("/")[1] || "";
	        		typeViolation = true;
					xhr.abort();
				/*if (!(format.toLowerCase().match(fileType)) || format.toLowerCase().match(typesBlocked)) {
	        		typeViolation = true;
					xhr.abort();*/
				} else if (maxSize && this.files[0].size > maxSize){
					sizeExceeded = true;
					xhr.abort();
				}
				me.fileName = this.files[0].name;
	        }, 
	        done: function (evt, opts) {
	            if (evt.type == 'fileuploaddone') {			            	
	            	if (typeof onSuccess == 'function') {
	            		onSuccess.call(me,opts.jqXHR.responseJSON);
					}
	            	else {
	            		console.warn("No success callback passed for file upload window.");
					}
	            }
	            else if (typeof onFailure == 'function') {
	            	onFailure.call(me,opts.jqXHR.responseJSON);
				}
	        },
			fail: function (evt,opts) {
				if(typeViolation){					
					document.getElementById('upload-error-span').innerHTML = 
					"O formato "+format+" não é válido.<br>"+(validSamples ? "Exemplos de formatos válidos: "+validSamples : "");
				} else if (sizeExceeded){
					document.getElementById('upload-error-span').innerHTML = 
					"Tamanho máximo excedido, o tamanho máximo é "+maxSize/10e5 +"MB";
				} else if (typeof onFailure == 'function') {
	            	onFailure.call(me,opts.jqXHR.responseJSON);
				}
			},
	        progressall: function (e, data) {
	            var progress = parseInt(data.loaded / data.total * 100, 10);
	            $('#file-upload-progress .progress-bar').css(
	                'width',
	                progress + '%'
	            );
	        }
	    }

	    $('#file-upload-field').fileupload(uploadOptions).prop('disabled', !$.support.fileInput)
			        .parent().addClass($.support.fileInput ? undefined : 'disabled');
	},

	readFile(title, msg, fileType, onSuccess) {
		var me = this;
		var format = "";
		ReactDOM.render((
			<FileReaderModal title={title} message={msg} type={fileType} onSuccess={onSuccess}/>
		),this.$el);
		this.show();
		
	},

	exportDocument(title, text, cb) {
		var me = this;
		ReactDOM.render((
			<ExportDocumentModal title={title} text={text} onConfirm={cb}/>
		),this.$el);
		this.show();
	},

	importUsers(title, text, cb) {
		var me = this;
		ReactDOM.render((
			<ImportUsersModal title={title} text={text} onConfirm={cb}/>
		),this.$el);
		this.show();
	}
};

$(() => {
	Modal.$init();
});

export default Modal;
