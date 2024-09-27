"use strict";(self.webpackChunkRTLApp=self.webpackChunkRTLApp||[]).push([[193],{5837:(J,G,r)=>{r.d(G,{f:()=>P});var a=r(1413),L=r(6977),f=r(4416),t=r(9647),e=r(4438),F=r(2571),A=r(9640),E=r(177),S=r(2920),c=r(9213),I=r(4823),R=r(6850);function y(z,V){if(1&z&&(e.j41(0,"mat-icon",10),e.EFF(1,"info_outline"),e.k0s()),2&z){const m=e.XpG().$implicit;e.Y8G("matTooltip",m.tooltip)}}function x(z,V){if(1&z&&(e.j41(0,"span",11),e.EFF(1),e.nI1(2,"number"),e.k0s()),2&z){const m=e.XpG().$implicit;e.R7$(),e.SpI(" ",e.i5U(2,1,m.dataValue,"1.0-0")," ")}}function b(z,V){if(1&z&&(e.j41(0,"span",11),e.EFF(1),e.nI1(2,"number"),e.k0s()),2&z){const m=e.XpG().$implicit,s=e.XpG(2);e.R7$(),e.SpI(" ",e.i5U(2,1,m[s.currencyUnitEnum.BTC],s.currencyUnitFormats.BTC)," ")}}function D(z,V){if(1&z&&(e.j41(0,"span",11),e.EFF(1),e.nI1(2,"number"),e.k0s()),2&z){const m=e.XpG().$implicit,s=e.XpG(2);e.R7$(),e.SpI(" ",e.i5U(2,1,m[s.currencyUnitEnum.OTHER],s.currencyUnitFormats.OTHER)," ")}}function U(z,V){if(1&z&&(e.j41(0,"div",6)(1,"div",7),e.EFF(2),e.DNE(3,y,2,1,"mat-icon",8),e.k0s(),e.DNE(4,x,3,4,"span",9)(5,b,3,4,"span",9)(6,D,3,4,"span",9),e.k0s()),2&z){const m=V.$implicit,s=e.XpG().$implicit,_=e.XpG();e.R7$(2),e.SpI(" ",m.title," "),e.R7$(),e.Y8G("ngIf",m.tooltip),e.R7$(),e.Y8G("ngIf",s===_.currencyUnitEnum.SATS),e.R7$(),e.Y8G("ngIf",s===_.currencyUnitEnum.BTC),e.R7$(),e.Y8G("ngIf",_.fiatConversion&&s!==_.currencyUnitEnum.SATS&&s!==_.currencyUnitEnum.BTC&&""===_.conversionErrorMsg)}}function k(z,V){if(1&z&&(e.j41(0,"div",12)(1,"div",13),e.EFF(2),e.k0s()()),2&z){const m=e.XpG(2);e.R7$(2),e.JRh(m.conversionErrorMsg)}}function B(z,V){if(1&z&&(e.j41(0,"mat-tab",2)(1,"div",3),e.DNE(2,U,7,5,"div",4),e.k0s(),e.DNE(3,k,3,1,"div",5),e.k0s()),2&z){const m=V.$implicit,s=e.XpG();e.FS9("label",m),e.R7$(2),e.Y8G("ngForOf",s.values),e.R7$(),e.Y8G("ngIf",s.fiatConversion&&m!==s.currencyUnitEnum.SATS&&m!==s.currencyUnitEnum.BTC&&""!==s.conversionErrorMsg)}}let P=(()=>{class z{constructor(m,s){this.commonService=m,this.store=s,this.values=[],this.currencyUnitEnum=f.BQ,this.currencyUnitFormats=f.k,this.currencyUnits=[],this.fiatConversion=!1,this.conversionErrorMsg="",this.unSubs=[new a.B,new a.B,new a.B,new a.B,new a.B]}ngOnChanges(){this.currencyUnits.length>1&&this.values[0]&&this.values[0].dataValue>=0&&this.getCurrencyValues()}ngOnInit(){this.store.select(t._c).pipe((0,L.Q)(this.unSubs[0])).subscribe(m=>{this.fiatConversion=m.settings.fiatConversion,this.currencyUnits=m.settings.currencyUnits,this.fiatConversion||this.currencyUnits.splice(2,1),this.currencyUnits.length>1&&this.values[0]&&this.values[0].dataValue>=0&&this.getCurrencyValues()})}getCurrencyValues(){this.commonService.convertCurrency(this.values[0].dataValue,f.BQ.SATS,f.BQ.BTC,"",!0).pipe((0,L.Q)(this.unSubs[1])).subscribe(m=>{this.values[0][f.BQ.BTC]=m.BTC}),this.commonService.convertCurrency(this.values[0].dataValue,f.BQ.SATS,f.BQ.OTHER,this.currencyUnits[2],this.fiatConversion).pipe((0,L.Q)(this.unSubs[2])).subscribe({next:m=>{if(this.values[0][f.BQ.OTHER]=m.OTHER,m.unit&&""!==m.unit)for(let s=1;s<this.values.length;s++){const _=this.values[s];this.commonService.convertCurrency(_.dataValue,f.BQ.SATS,f.BQ.BTC,"",!0).pipe((0,L.Q)(this.unSubs[3])).subscribe(C=>{this.values[s][f.BQ.BTC]=C.BTC}),this.commonService.convertCurrency(_.dataValue,f.BQ.SATS,f.BQ.OTHER,this.currencyUnits[2],this.fiatConversion).pipe((0,L.Q)(this.unSubs[4])).subscribe({next:C=>{this.values[s][f.BQ.OTHER]=C.OTHER},error:C=>{this.conversionErrorMsg="Conversion Error: "+C}})}},error:m=>{this.conversionErrorMsg="Conversion Error: "+m}})}ngOnDestroy(){this.unSubs.forEach(m=>{m.next(null),m.complete()})}static#c=this.\u0275fac=function(s){return new(s||z)(e.rXU(F.h),e.rXU(A.il))};static#a=this.\u0275cmp=e.VBU({type:z,selectors:[["rtl-currency-unit-converter"]],inputs:{values:"values"},features:[e.OA$],decls:2,vars:1,consts:[["mat-stretch-tabs","false","mat-align-tabs","start"],[3,"label",4,"ngFor","ngForOf"],[3,"label"],["fxLayout","row","fxFlex","100","fxLayoutAlign","start start"],["fxLayout","column","fxLayoutAlign","center start","class","cc-data-block",4,"ngFor","ngForOf"],["fxLayout","row","fxFlex","100","class","p-1 error-border mt-1",4,"ngIf"],["fxLayout","column","fxLayoutAlign","center start",1,"cc-data-block"],["fxLayout","row","fxFlex","100","fxLayoutAlign","start start",1,"cc-data-title"],["matTooltipPosition","below","class","info-icon",3,"matTooltip",4,"ngIf"],["class","cc-data-value",4,"ngIf"],["matTooltipPosition","below",1,"info-icon",3,"matTooltip"],[1,"cc-data-value"],["fxLayout","row","fxFlex","100",1,"p-1","error-border","mt-1"],[1,"cc-data-block"]],template:function(s,_){1&s&&(e.j41(0,"mat-tab-group",0),e.DNE(1,B,4,3,"mat-tab",1),e.k0s()),2&s&&(e.R7$(),e.Y8G("ngForOf",_.currencyUnits))},dependencies:[E.Sq,E.bT,S.DJ,S.sA,S.UI,c.An,I.oV,R.mq,R.T8,E.QX]})}return z})()},396:(J,G,r)=>{r.d(G,{f:()=>m});var a=r(5351),L=r(5383),f=r(4416),t=r(4438),e=r(8570),F=r(2571),A=r(5416),E=r(177),S=r(60),c=r(2920),I=r(6038),R=r(8834),y=r(5596),x=r(1997),b=r(8288),D=r(9157),U=r(9587);const k=s=>({"display-none":s});function B(s,_){if(1&s&&(t.j41(0,"div",20),t.nrm(1,"qr-code",21),t.k0s()),2&s){const C=t.XpG();t.Y8G("ngClass",t.eq3(4,k,C.screenSize===C.screenSizeEnum.XS||C.screenSize===C.screenSizeEnum.SM)),t.R7$(),t.Y8G("value",C.address)("size",C.qrWidth)("errorCorrectionLevel","L")}}function P(s,_){if(1&s&&(t.j41(0,"div",22),t.nrm(1,"qr-code",21),t.k0s()),2&s){const C=t.XpG();t.Y8G("ngClass",t.eq3(4,k,C.screenSize!==C.screenSizeEnum.XS&&C.screenSize!==C.screenSizeEnum.SM)),t.R7$(),t.Y8G("value",C.address)("size",C.qrWidth)("errorCorrectionLevel","L")}}function z(s,_){if(1&s&&(t.j41(0,"div",13)(1,"div",14)(2,"h4",15),t.EFF(3,"Address Type"),t.k0s(),t.j41(4,"span",23),t.EFF(5),t.k0s()()()),2&s){const C=t.XpG();t.R7$(5),t.JRh(C.addressType)}}function V(s,_){1&s&&t.nrm(0,"mat-divider",17)}let m=(()=>{class s{constructor(C,T,H,w,O){this.dialogRef=C,this.data=T,this.logger=H,this.commonService=w,this.snackBar=O,this.faReceipt=L.Mf0,this.address="",this.addressType="",this.qrWidth=230,this.screenSize="",this.screenSizeEnum=f.f7}ngOnInit(){this.address=this.data.address,this.addressType=this.data.addressType,this.screenSize=this.commonService.getScreenSize()}onClose(){this.dialogRef.close(!1)}onCopyAddress(C){this.snackBar.open("Generated address copied."),this.logger.info("Copied Text: "+C)}static#c=this.\u0275fac=function(T){return new(T||s)(t.rXU(a.CP),t.rXU(a.Vh),t.rXU(e.gP),t.rXU(F.h),t.rXU(A.UG))};static#a=this.\u0275cmp=t.VBU({type:s,selectors:[["rtl-on-chain-generated-address"]],decls:25,vars:8,consts:[["fxLayout","column","fxLayout.gt-sm","row","fxLayoutAlign","space-between stretch"],["fxFlex","35","fxLayoutAlign","center start","class","modal-qr-code-container padding-gap-large",3,"ngClass",4,"ngIf"],["fxFlex","65"],["fxLayout","row","fxLayoutAlign","space-between center",1,"modal-info-header"],["fxFlex","95","fxLayoutAlign","start start"],[1,"page-title-img","mr-1",3,"icon"],[1,"page-title"],["tabindex","2","fxFlex","5","fxLayoutAlign","center center","mat-button","",1,"btn-close-x","p-0",3,"click"],[1,"padding-gap-x-large"],["fxLayout","column"],["fxFlex","50","fxLayoutAlign","center start","class","modal-qr-code-container padding-gap-large",3,"ngClass",4,"ngIf"],["fxLayout","row",4,"ngIf"],["class","w-100 my-1",4,"ngIf"],["fxLayout","row"],["fxFlex","100"],["fxLayoutAlign","start",1,"font-bold-500"],[1,"overflow-wrap","foreground-secondary-text"],[1,"w-100","my-1"],["fxLayout","row","fxLayoutAlign","end center",1,"mt-1"],["autoFocus","","mat-button","","color","primary","tabindex","1","type","submit","rtlClipboard","",3,"copied","payload"],["fxFlex","35","fxLayoutAlign","center start",1,"modal-qr-code-container","padding-gap-large",3,"ngClass"],[3,"value","size","errorCorrectionLevel"],["fxFlex","50","fxLayoutAlign","center start",1,"modal-qr-code-container","padding-gap-large",3,"ngClass"],[1,"foreground-secondary-text"]],template:function(T,H){1&T&&(t.j41(0,"div",0),t.DNE(1,B,2,6,"div",1),t.j41(2,"div",2)(3,"mat-card-header",3)(4,"div",4),t.nrm(5,"fa-icon",5),t.j41(6,"span",6),t.EFF(7),t.k0s()(),t.j41(8,"button",7),t.bIt("click",function(){return H.onClose()}),t.EFF(9,"X"),t.k0s()(),t.j41(10,"mat-card-content",8)(11,"div",9),t.DNE(12,P,2,6,"div",10)(13,z,6,1,"div",11)(14,V,1,0,"mat-divider",12),t.j41(15,"div",13)(16,"div",14)(17,"h4",15),t.EFF(18,"Address"),t.k0s(),t.j41(19,"span",16),t.EFF(20),t.k0s()()(),t.nrm(21,"mat-divider",17),t.j41(22,"div",18)(23,"button",19),t.bIt("copied",function(O){return H.onCopyAddress(O)}),t.EFF(24,"Copy Address"),t.k0s()()()()()()),2&T&&(t.R7$(),t.Y8G("ngIf",H.address),t.R7$(4),t.Y8G("icon",H.faReceipt),t.R7$(2),t.JRh(H.screenSize===H.screenSizeEnum.XS?"Address":"Generated Address"),t.R7$(5),t.Y8G("ngIf",H.address),t.R7$(),t.Y8G("ngIf",""!==H.addressType),t.R7$(),t.Y8G("ngIf",""!==H.addressType),t.R7$(6),t.JRh(H.address),t.R7$(3),t.Y8G("payload",H.address))},dependencies:[E.YU,E.bT,S.aY,c.DJ,c.sA,c.UI,I.PW,R.$z,y.m2,y.MM,x.q,b.Um,D.U,U.N]})}return s})()},4655:(J,G,r)=>{r.d(G,{m:()=>q});var a=r(4438),L=r(6949),f=r(4416),t=r(8570),e=r(177),F=r(9417),A=r(2920),E=r(8834),S=r(5084),c=r(9213),I=r(9631),R=r(6467),y=r(2798),x=r(6600);let b=(()=>{class o extends x.xW{constructor(i){super(i)}format(i,d){return"MMM YYYY"===d?f.KR[i.getMonth()].name+", "+i.getFullYear():"YYYY"===d?i.getFullYear().toString():i.getDate()+"/"+f.KR[i.getMonth()].name+"/"+i.getFullYear()}static#c=this.\u0275fac=function(d){return new(d||o)(a.KVO(x.Ju,8))};static#a=this.\u0275prov=a.jDH({token:o,factory:o.\u0275fac})}return o})();const D={parse:{dateInput:"LL"},display:{dateInput:"MMM YYYY",monthYearLabel:"YYYY",dateA11yLabel:"LL",monthYearA11yLabel:"YYYY"}},U={parse:{dateInput:"LL"},display:{dateInput:"YYYY",monthYearLabel:"YYYY",dateA11yLabel:"LL",monthYearA11yLabel:"YYYY"}};let k=(()=>{class o{static#c=this.\u0275fac=function(d){return new(d||o)};static#a=this.\u0275dir=a.FsC({type:o,selectors:[["","monthlyDate",""]],features:[a.Jv_([{provide:x.MJ,useClass:b},{provide:x.de,useValue:D}])]})}return o})(),B=(()=>{class o{static#c=this.\u0275fac=function(d){return new(d||o)};static#a=this.\u0275dir=a.FsC({type:o,selectors:[["","yearlyDate",""]],features:[a.Jv_([{provide:x.MJ,useClass:b},{provide:x.de,useValue:U}])]})}return o})();var P=r(92),z=r(6114);const V=["monthlyDatepicker"],m=["yearlyDatepicker"],s=()=>({animationDirection:"forward"}),_=()=>({animationDirection:"backward"}),C=()=>({animationDirection:""});function T(o,N){if(1&o&&a.eu8(0,13),2&o){a.XpG();const i=a.sdS(19);a.Y8G("ngTemplateOutlet",i)("ngTemplateOutletContext",a.lJ4(2,s))}}function H(o,N){if(1&o&&a.eu8(0,13),2&o){a.XpG();const i=a.sdS(19);a.Y8G("ngTemplateOutlet",i)("ngTemplateOutletContext",a.lJ4(2,_))}}function w(o,N){if(1&o&&a.eu8(0,13),2&o){a.XpG();const i=a.sdS(19);a.Y8G("ngTemplateOutlet",i)("ngTemplateOutletContext",a.lJ4(2,C))}}function O(o,N){if(1&o&&(a.j41(0,"mat-option",21),a.EFF(1),a.nI1(2,"titlecase"),a.k0s()),2&o){const i=N.$implicit;a.Y8G("value",i),a.R7$(),a.SpI(" ",a.bMT(2,2,i)," ")}}function $(o,N){if(1&o){const i=a.RV6();a.j41(0,"mat-form-field",22)(1,"input",23,1),a.mxI("ngModelChange",function(h){a.eBV(i);const p=a.XpG(2);return a.DH7(p.selectedValue,h)||(p.selectedValue=h),a.Njj(h)}),a.k0s(),a.nrm(3,"mat-datepicker-toggle",24),a.j41(4,"mat-datepicker",25,2),a.bIt("monthSelected",function(h){a.eBV(i);const p=a.XpG(2);return a.Njj(p.onMonthSelected(h))})("dateSelected",function(h){a.eBV(i);const p=a.XpG(2);return a.Njj(p.onMonthSelected(h))}),a.k0s()()}if(2&o){const i=a.sdS(5),d=a.XpG(2);a.R7$(),a.Y8G("matDatepicker",i)("min",d.first)("max",d.last),a.R50("ngModel",d.selectedValue),a.R7$(2),a.Y8G("for",i),a.R7$(),a.Y8G("startAt",d.selectedValue)}}function W(o,N){if(1&o){const i=a.RV6();a.j41(0,"mat-form-field",26)(1,"input",27,3),a.mxI("ngModelChange",function(h){a.eBV(i);const p=a.XpG(2);return a.DH7(p.selectedValue,h)||(p.selectedValue=h),a.Njj(h)}),a.k0s(),a.nrm(3,"mat-datepicker-toggle",24),a.j41(4,"mat-datepicker",28,4),a.bIt("yearSelected",function(h){a.eBV(i);const p=a.XpG(2);return a.Njj(p.onYearSelected(h))})("monthSelected",function(h){a.eBV(i);const p=a.XpG(2);return a.Njj(p.onYearSelected(h))})("dateSelected",function(h){a.eBV(i);const p=a.XpG(2);return a.Njj(p.onYearSelected(h))}),a.k0s()()}if(2&o){const i=a.sdS(5),d=a.XpG(2);a.R7$(),a.Y8G("matDatepicker",i)("min",d.first)("max",d.last),a.R50("ngModel",d.selectedValue),a.R7$(2),a.Y8G("for",i),a.R7$(),a.Y8G("startAt",d.selectedValue)}}function X(o,N){if(1&o){const i=a.RV6();a.j41(0,"div",14)(1,"div",15)(2,"mat-select",16),a.mxI("ngModelChange",function(h){a.eBV(i);const p=a.XpG();return a.DH7(p.selScrollRange,h)||(p.selScrollRange=h),a.Njj(h)}),a.bIt("selectionChange",function(h){a.eBV(i);const p=a.XpG();return a.Njj(p.onRangeChanged(h))}),a.DNE(3,O,3,4,"mat-option",17),a.k0s()(),a.j41(4,"div",18),a.DNE(5,$,6,6,"mat-form-field",19)(6,W,6,6,"mat-form-field",20),a.k0s()()}if(2&o){const i=a.XpG();a.Y8G("@sliderAnimation",i.animationDirection),a.R7$(2),a.R50("ngModel",i.selScrollRange),a.R7$(),a.Y8G("ngForOf",i.scrollRanges),a.R7$(2),a.Y8G("ngIf",i.selScrollRange===i.scrollRanges[0]),a.R7$(),a.Y8G("ngIf",i.selScrollRange===i.scrollRanges[1])}}let q=(()=>{class o{constructor(i){this.logger=i,this.scrollRanges=f.rs,this.selScrollRange=this.scrollRanges[0],this.today=new Date(Date.now()),this.first=new Date(2018,0,1,0,0,0),this.last=new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate(),0,0,0),this.disablePrev=!1,this.disableNext=!0,this.animationDirection="",this.selectedValue=this.last,this.stepChanged=new a.bkB}onRangeChanged(i){this.selScrollRange=i.value,this.onStepChange("LAST")}onMonthSelected(i){this.selectedValue=i,this.onStepChange("SELECTED"),this.monthlyDatepicker.close()}onYearSelected(i){this.selectedValue=i,this.onStepChange("SELECTED"),this.yearlyDatepicker.close()}onStepChange(i){switch(this.logger.info(i),i){case"FIRST":this.animationDirection="backward",this.selectedValue!==this.first&&(this.selectedValue=this.first,this.stepChanged.emit({selDate:this.selectedValue,selScrollRange:this.selScrollRange}));break;case"PREVIOUS":this.selectedValue=this.selScrollRange===f.rs[1]?new Date(this.selectedValue.getFullYear()-1,0,1,0,0,0):new Date(this.selectedValue.getFullYear(),this.selectedValue.getMonth()-1,1,0,0,0),this.animationDirection="backward",this.stepChanged.emit({selDate:this.selectedValue,selScrollRange:this.selScrollRange});break;case"NEXT":this.selectedValue=this.selScrollRange===f.rs[1]?new Date(this.selectedValue.getFullYear()+1,0,1,0,0,0):new Date(this.selectedValue.getFullYear(),this.selectedValue.getMonth()+1,1,0,0,0),this.animationDirection="forward",this.stepChanged.emit({selDate:this.selectedValue,selScrollRange:this.selScrollRange});break;case"LAST":this.animationDirection="forward",this.selectedValue=this.last,this.stepChanged.emit({selDate:this.selectedValue,selScrollRange:this.selScrollRange});break;default:this.animationDirection="",this.stepChanged.emit({selDate:this.selectedValue,selScrollRange:this.selScrollRange})}this.disablePrev=this.selScrollRange===f.rs[1]?this.selectedValue.getFullYear()<=this.first.getFullYear():this.selectedValue.getFullYear()<=this.first.getFullYear()&&this.selectedValue.getMonth()<=this.first.getMonth(),this.disableNext=this.selScrollRange===f.rs[1]?this.selectedValue.getFullYear()>=this.last.getFullYear():this.selectedValue.getFullYear()>=this.last.getFullYear()&&this.selectedValue.getMonth()>=this.last.getMonth(),this.logger.info(this.disablePrev),this.logger.info(this.disableNext),setTimeout(()=>{this.animationDirection=""},800)}onChartMouseUp(i){"monthlyDate"===i.srcElement.name?this.monthlyDatepicker.open():"yearlyDate"===i.srcElement.name&&this.yearlyDatepicker.open()}static#c=this.\u0275fac=function(d){return new(d||o)(a.rXU(t.gP))};static#a=this.\u0275cmp=a.VBU({type:o,selectors:[["rtl-horizontal-scroller"]],viewQuery:function(d,h){if(1&d&&(a.GBs(V,5),a.GBs(m,5)),2&d){let p;a.mGM(p=a.lsd())&&(h.monthlyDatepicker=p.first),a.mGM(p=a.lsd())&&(h.yearlyDatepicker=p.first)}},hostBindings:function(d,h){1&d&&a.bIt("click",function(Y){return h.onChartMouseUp(Y)})},outputs:{stepChanged:"stepChanged"},decls:20,vars:5,consts:[["controlsPanel",""],["monthlyDt","ngModel"],["monthlyDatepicker",""],["yearlyDt","ngModel"],["yearlyDatepicker",""],["fxLayout","row","fxLayoutAlign","space-between stretch","fxFlex","100",1,"padding-gap-x"],["fxLayout","row","fxLayoutAlign","start center","fxFlex","20"],["mat-icon-button","","color","primary","type","button","tabindex","1",1,"pr-4",3,"click"],["mat-icon-button","","color","primary","type","button","tabindex","2",3,"click","disabled"],[3,"ngTemplateOutlet","ngTemplateOutletContext",4,"ngIf"],["fxLayout","row","fxLayoutAlign","end center","fxFlex","20"],["mat-icon-button","","color","primary","type","button","tabindex","5",1,"pr-4",3,"click","disabled"],["mat-icon-button","","color","primary","type","button","tabindex","6",3,"click"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["fxLayout","row","fxLayoutAlign","center center","fxFlex","58"],["fxFlex","50","fxLayoutAlign","center center","fxLayoutAlign.gt-xs","end center",1,"font-bold-700"],["fxFlex","60","fxFlex.gt-md","30","name","selScrlRange","tabindex","3",1,"font-bold-700",3,"ngModelChange","selectionChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],["fxFlex","50","fxLayout","row","fxLayoutAlign","center center","fxLayoutAlign.gt-xs","start center"],["monthlyDate","","fxLayoutAlign","center center",4,"ngIf"],["yearlyDate","","fxLayoutAlign","center center",4,"ngIf"],[3,"value"],["monthlyDate","","fxLayoutAlign","center center"],["matInput","","name","monthlyDate","tabindex","4","readonly","",3,"ngModelChange","matDatepicker","min","max","ngModel"],["matSuffix","",3,"for"],["startView","year",3,"monthSelected","dateSelected","startAt"],["yearlyDate","","fxLayoutAlign","center center"],["matInput","","name","yearlyDate","tabindex","4","readonly","",3,"ngModelChange","matDatepicker","min","max","ngModel"],["startView","multi-year",3,"yearSelected","monthSelected","dateSelected","startAt"]],template:function(d,h){if(1&d){const p=a.RV6();a.j41(0,"div",5)(1,"div",6)(2,"button",7),a.bIt("click",function(){return a.eBV(p),a.Njj(h.onStepChange("FIRST"))}),a.j41(3,"mat-icon"),a.EFF(4,"skip_previous"),a.k0s()(),a.j41(5,"button",8),a.bIt("click",function(){return a.eBV(p),a.Njj(h.onStepChange("PREVIOUS"))}),a.j41(6,"mat-icon"),a.EFF(7,"navigate_before"),a.k0s()()(),a.DNE(8,T,1,3,"ng-container",9)(9,H,1,3,"ng-container",9)(10,w,1,3,"ng-container",9),a.j41(11,"div",10)(12,"button",11),a.bIt("click",function(){return a.eBV(p),a.Njj(h.onStepChange("NEXT"))}),a.j41(13,"mat-icon"),a.EFF(14,"navigate_next"),a.k0s()(),a.j41(15,"button",12),a.bIt("click",function(){return a.eBV(p),a.Njj(h.onStepChange("LAST"))}),a.j41(16,"mat-icon"),a.EFF(17,"skip_next"),a.k0s()()()(),a.DNE(18,X,7,5,"ng-template",null,0,a.C5r)}2&d&&(a.R7$(5),a.Y8G("disabled",h.disablePrev),a.R7$(3),a.Y8G("ngIf","forward"===h.animationDirection),a.R7$(),a.Y8G("ngIf","backward"===h.animationDirection),a.R7$(),a.Y8G("ngIf",""===h.animationDirection),a.R7$(2),a.Y8G("disabled",h.disableNext))},dependencies:[e.Sq,e.bT,e.T3,F.me,F.BC,F.vS,A.DJ,A.sA,A.UI,E.iY,S.Vh,S.bZ,S.bU,c.An,I.fg,R.rl,R.yw,y.VO,x.wT,k,B,P.z,z.V,e.PV],data:{animation:[L.k]}})}return o})()},5085:(J,G,r)=>{r.d(G,{T:()=>a2});var a=r(6695),L=r(2042),f=r(9159),t=r(2798),e=r(4416),F=r(1771),A=r(1413),E=r(6977),S=r(9647),c=r(4438),I=r(2571),R=r(9640),y=r(177),x=r(2929),b=r(9417),D=r(2920),U=r(6038),k=r(8834),B=r(9631),P=r(6467),z=r(6600),V=r(497);const m=()=>["all"],s=()=>["no_transaction"],_=l=>({"display-none":l});function C(l,M){if(1&l&&(c.j41(0,"mat-option",30),c.EFF(1),c.k0s()),2&l){const n=M.$implicit,v=c.XpG();c.Y8G("value",n),c.R7$(),c.JRh(v.getLabel(n))}}function T(l,M){1&l&&(c.j41(0,"th",31),c.EFF(1,"Date"),c.k0s())}function H(l,M){if(1&l&&(c.j41(0,"td",32),c.EFF(1),c.nI1(2,"date"),c.k0s()),2&l){const n=M.$implicit,v=c.XpG();c.R7$(),c.JRh(c.i5U(2,1,null==n?null:n.date,v.dataRange===v.scrollRanges[1]?"MMM/yyyy":"dd/MMM/yyyy"))}}function w(l,M){1&l&&(c.j41(0,"th",33),c.EFF(1,"Amount Paid (Sats)"),c.k0s())}function O(l,M){if(1&l&&(c.j41(0,"td",32)(1,"span",34),c.EFF(2),c.nI1(3,"number"),c.k0s()()),2&l){const n=M.$implicit;c.R7$(2),c.JRh(c.i5U(3,1,null==n?null:n.amount_paid,"1.0-2"))}}function $(l,M){1&l&&(c.j41(0,"th",33),c.EFF(1,"# Payments"),c.k0s())}function W(l,M){if(1&l&&(c.j41(0,"td",32)(1,"span",34),c.EFF(2),c.nI1(3,"number"),c.k0s()()),2&l){const n=M.$implicit;c.R7$(2),c.JRh(c.bMT(3,1,null==n?null:n.num_payments))}}function X(l,M){1&l&&(c.j41(0,"th",33),c.EFF(1,"Amount Received (Sats)"),c.k0s())}function q(l,M){if(1&l&&(c.j41(0,"td",32)(1,"span",34),c.EFF(2),c.nI1(3,"number"),c.k0s()()),2&l){const n=M.$implicit;c.R7$(2),c.JRh(c.i5U(3,1,null==n?null:n.amount_received,"1.0-2"))}}function o(l,M){1&l&&(c.j41(0,"th",33),c.EFF(1,"# Invoices"),c.k0s())}function N(l,M){if(1&l&&(c.j41(0,"td",32)(1,"span",34),c.EFF(2),c.nI1(3,"number"),c.k0s()()),2&l){const n=M.$implicit;c.R7$(2),c.JRh(c.bMT(3,1,null==n?null:n.num_invoices))}}function i(l,M){if(1&l){const n=c.RV6();c.j41(0,"th",35)(1,"div",36)(2,"mat-select",37),c.nrm(3,"mat-select-trigger"),c.j41(4,"mat-option",38),c.bIt("click",function(){c.eBV(n);const u=c.XpG();return c.Njj(u.onDownloadCSV())}),c.EFF(5,"Download CSV"),c.k0s()()()()}}function d(l,M){if(1&l){const n=c.RV6();c.j41(0,"td",39)(1,"button",40),c.bIt("click",function(){const u=c.eBV(n).$implicit,g=c.XpG();return c.Njj(g.onTransactionClick(u))}),c.EFF(2,"View Info"),c.k0s()()}}function h(l,M){1&l&&(c.j41(0,"p"),c.EFF(1,"No transaction available."),c.k0s())}function p(l,M){if(1&l&&(c.j41(0,"td",41),c.DNE(1,h,2,0,"p",42),c.k0s()),2&l){const n=c.XpG();c.R7$(),c.Y8G("ngIf",!(null!=n.transactions&&n.transactions.data)||(null==n.transactions||null==n.transactions.data?null:n.transactions.data.length)<1)}}function Y(l,M){if(1&l&&c.nrm(0,"tr",43),2&l){const n=c.XpG();c.Y8G("ngClass",c.eq3(1,_,(null==n.transactions?null:n.transactions.data)&&(null==n.transactions||null==n.transactions.data?null:n.transactions.data.length)>0))}}function Q(l,M){1&l&&c.nrm(0,"tr",44)}function c2(l,M){1&l&&c.nrm(0,"tr",45)}let a2=(()=>{class l{constructor(n,v,u,g){this.commonService=n,this.store=v,this.datePipe=u,this.camelCaseWithReplace=g,this.dataRange=e.rs[0],this.dataList=[],this.selFilter="",this.displayedColumns=["date","amount_paid","num_payments","amount_received","num_invoices"],this.tableSetting={tableId:"transactions",recordsPerPage:e.md,sortBy:"date",sortOrder:e.oi.DESCENDING},this.nodePageDefs=e._1,this.selFilterBy="all",this.timezoneOffset=60*new Date(Date.now()).getTimezoneOffset(),this.scrollRanges=e.rs,this.transactions=new f.I6([]),this.pageSize=e.md,this.pageSizeOptions=e.xp,this.screenSize="",this.screenSizeEnum=e.f7,this.unSubs=[new A.B,new A.B],this.screenSize=this.commonService.getScreenSize()}ngOnChanges(n){n.dataList&&!n.dataList.firstChange&&(this.pageSize=this.tableSetting.recordsPerPage?+this.tableSetting.recordsPerPage:e.md,this.loadTransactionsTable(this.dataList)),n.selFilter&&!n.selFilter.firstChange&&(this.selFilterBy="all",this.applyFilter())}ngOnInit(){this.store.select(S._c).pipe((0,E.Q)(this.unSubs[0])).subscribe(n=>{this.nodePageDefs="CLN"===n.lnImplementation?e.Jd:"ECL"===n.lnImplementation?e.WW:e._1}),this.pageSize=this.tableSetting.recordsPerPage?+this.tableSetting.recordsPerPage:e.md,this.dataList&&this.dataList.length>0&&this.loadTransactionsTable(this.dataList)}ngAfterViewInit(){setTimeout(()=>{this.setTableWidgets()},0)}onTransactionClick(n){const v=[[{key:"date",value:this.datePipe.transform(n.date,this.dataRange===e.rs[1]?"MMM/yyyy":"dd/MMM/yyyy"),title:"Date",width:100,type:e.UN.DATE}],[{key:"amount_paid",value:Math.round(n.amount_paid),title:"Amount Paid (Sats)",width:50,type:e.UN.NUMBER},{key:"num_payments",value:n.num_payments,title:"# Payments",width:50,type:e.UN.NUMBER}],[{key:"amount_received",value:Math.round(n.amount_received),title:"Amount Received (Sats)",width:50,type:e.UN.NUMBER},{key:"num_invoices",value:n.num_invoices,title:"# Invoices",width:50,type:e.UN.NUMBER}]];this.store.dispatch((0,F.xO)({payload:{data:{type:e.A$.INFORMATION,alertTitle:"Transaction Summary",message:v}}}))}applyFilter(){this.transactions&&(this.transactions.filter=this.selFilter.trim().toLowerCase())}getLabel(n){const v=this.nodePageDefs.reports[this.tableSetting.tableId].allowedColumns.find(u=>u.column===n);return v?v.label?v.label:this.camelCaseWithReplace.transform(v.column,"_"):this.commonService.titleCase(n)}setFilterPredicate(){this.transactions.filterPredicate=(n,v)=>{let u="";switch(this.selFilterBy){case"all":u=(n.date?(this.datePipe.transform(n.date,"dd/MMM")+"/"+n.date.getFullYear()).toLowerCase():"")+JSON.stringify(n).toLowerCase();break;case"date":u=this.datePipe.transform(new Date(n[this.selFilterBy]||0),this.dataRange===this.scrollRanges[1]?"MMM/yyyy":"dd/MMM/yyyy")?.toLowerCase()||"";break;default:u=typeof n[this.selFilterBy]>"u"?"":"string"==typeof n[this.selFilterBy]?n[this.selFilterBy].toLowerCase():"boolean"==typeof n[this.selFilterBy]?n[this.selFilterBy]?"yes":"no":n[this.selFilterBy].toString()}return u.includes(v)}}loadTransactionsTable(n){this.transactions=new f.I6(n?[...n]:[]),this.setTableWidgets()}setTableWidgets(){this.transactions&&this.transactions.data&&this.transactions.data.length>0&&(this.transactions.sort=this.sort,this.transactions.sortingDataAccessor=(n,v)=>n[v]&&isNaN(n[v])?n[v].toLocaleLowerCase():n[v]?+n[v]:null,this.transactions.paginator=this.paginator,this.setFilterPredicate(),this.applyFilter())}onDownloadCSV(){this.transactions.data&&this.transactions.data.length>0&&this.commonService.downloadFile(this.dataList,"Transactions-report-"+this.dataRange.toLowerCase())}ngOnDestroy(){this.unSubs.forEach(n=>{n.next(),n.complete()})}static#c=this.\u0275fac=function(v){return new(v||l)(c.rXU(I.h),c.rXU(R.il),c.rXU(y.vh),c.rXU(x.VD))};static#a=this.\u0275cmp=c.VBU({type:l,selectors:[["rtl-transactions-report-table"]],viewQuery:function(v,u){if(1&v&&(c.GBs(L.B4,5),c.GBs(a.iy,5)),2&v){let g;c.mGM(g=c.lsd())&&(u.sort=g.first),c.mGM(g=c.lsd())&&(u.paginator=g.first)}},inputs:{dataRange:"dataRange",dataList:"dataList",selFilter:"selFilter",displayedColumns:"displayedColumns",tableSetting:"tableSetting"},features:[c.Jv_([{provide:t.JO,useValue:{overlayPanelClass:"rtl-select-overlay"}},{provide:a.xX,useValue:(0,e.on)("Transactions")}]),c.OA$],decls:43,vars:14,consts:[["table",""],["fxLayout","column","fxFlex","100","fxLayoutAlign","space-between stretch",1,"padding-gap-x"],["fxLayout","column","fxLayoutAlign","start stretch"],["fxLayout","column","fxLayoutAlign","start stretch","fxLayout.gt-sm","row wrap",1,"page-sub-title-container","mt-1"],["fxFlex","70"],["fxFlex.gt-xs","30","fxLayoutAlign.gt-xs","space-between center","fxLayout","row","fxLayoutAlign","space-between stretch"],["fxLayout","column","fxFlex","49"],["tabindex","1","name","filterBy",3,"ngModelChange","selectionChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],["matInput","","name","filter",3,"ngModelChange","input","keyup","ngModel"],["fxLayout","row","fxLayoutAlign","start start"],["fxLayout","column","fxFlex","100",1,"table-container",3,"perfectScrollbar"],["mat-table","","fxFlex","100","matSort","",1,"overflow-auto",3,"matSortActive","matSortDirection","dataSource"],["matColumnDef","date"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","amount_paid"],["mat-header-cell","","mat-sort-header","","arrowPosition","before",4,"matHeaderCellDef"],["matColumnDef","num_payments"],["matColumnDef","amount_received"],["matColumnDef","num_invoices"],["matColumnDef","actions"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","","fxLayoutAlign","end center",4,"matCellDef"],["matColumnDef","no_transaction"],["mat-footer-cell","","colspan","4",4,"matFooterCellDef"],["mat-footer-row","",3,"ngClass",4,"matFooterRowDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[1,"mb-1",3,"pageSize","pageSizeOptions","showFirstLastButtons"],[3,"value"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell","","mat-sort-header","","arrowPosition","before"],["fxLayoutAlign","end center"],["mat-header-cell",""],["fxLayoutAlign","center center",1,"bordered-box","table-actions-select"],["placeholder","Actions","tabindex","1",1,"mr-0"],[3,"click"],["mat-cell","","fxLayoutAlign","end center"],["mat-stroked-button","","color","primary","type","button","tabindex","4",1,"table-actions-button",3,"click"],["mat-footer-cell","","colspan","4"],[4,"ngIf"],["mat-footer-row","",3,"ngClass"],["mat-header-row",""],["mat-row",""]],template:function(v,u){if(1&v){const g=c.RV6();c.j41(0,"div",1)(1,"div",2)(2,"div",3),c.nrm(3,"div",4),c.j41(4,"div",5)(5,"mat-form-field",6)(6,"mat-label"),c.EFF(7,"Filter By"),c.k0s(),c.j41(8,"mat-select",7),c.mxI("ngModelChange",function(j){return c.eBV(g),c.DH7(u.selFilterBy,j)||(u.selFilterBy=j),c.Njj(j)}),c.bIt("selectionChange",function(){return c.eBV(g),u.selFilter="",c.Njj(u.applyFilter())}),c.j41(9,"perfect-scrollbar"),c.DNE(10,C,2,2,"mat-option",8),c.k0s()()(),c.j41(11,"mat-form-field",6)(12,"mat-label"),c.EFF(13,"Filter"),c.k0s(),c.j41(14,"input",9),c.mxI("ngModelChange",function(j){return c.eBV(g),c.DH7(u.selFilter,j)||(u.selFilter=j),c.Njj(j)}),c.bIt("input",function(){return c.eBV(g),c.Njj(u.applyFilter())})("keyup",function(){return c.eBV(g),c.Njj(u.applyFilter())}),c.k0s()()()(),c.j41(15,"div",10)(16,"div",11)(17,"table",12,0),c.qex(19,13),c.DNE(20,T,2,0,"th",14)(21,H,3,4,"td",15),c.bVm(),c.qex(22,16),c.DNE(23,w,2,0,"th",17)(24,O,4,4,"td",15),c.bVm(),c.qex(25,18),c.DNE(26,$,2,0,"th",17)(27,W,4,3,"td",15),c.bVm(),c.qex(28,19),c.DNE(29,X,2,0,"th",17)(30,q,4,4,"td",15),c.bVm(),c.qex(31,20),c.DNE(32,o,2,0,"th",17)(33,N,4,3,"td",15),c.bVm(),c.qex(34,21),c.DNE(35,i,6,0,"th",22)(36,d,3,0,"td",23),c.bVm(),c.qex(37,24),c.DNE(38,p,2,1,"td",25),c.bVm(),c.DNE(39,Y,1,3,"tr",26)(40,Q,1,0,"tr",27)(41,c2,1,0,"tr",28),c.k0s(),c.nrm(42,"mat-paginator",29),c.k0s()()()()}2&v&&(c.R7$(8),c.R50("ngModel",u.selFilterBy),c.R7$(2),c.Y8G("ngForOf",c.lJ4(12,m).concat(u.displayedColumns.slice(0,-1))),c.R7$(4),c.R50("ngModel",u.selFilter),c.R7$(3),c.Y8G("matSortActive",u.tableSetting.sortBy)("matSortDirection",u.tableSetting.sortOrder)("dataSource",u.transactions),c.R7$(22),c.Y8G("matFooterRowDef",c.lJ4(13,s)),c.R7$(),c.Y8G("matHeaderRowDef",u.displayedColumns),c.R7$(),c.Y8G("matRowDefColumns",u.displayedColumns),c.R7$(),c.Y8G("pageSize",u.pageSize)("pageSizeOptions",u.pageSizeOptions)("showFirstLastButtons",u.screenSize!==u.screenSizeEnum.XS))},dependencies:[y.YU,y.Sq,y.bT,b.me,b.BC,b.vS,D.DJ,D.sA,D.UI,U.PW,k.$z,B.fg,P.rl,P.nJ,t.VO,t.$2,z.wT,L.B4,L.aE,f.Zl,f.tL,f.ji,f.cC,f.YV,f.iL,f.Zq,f.xW,f.KS,f.$R,f.Qo,f.YZ,f.NB,f.iF,a.iy,V.ZF,V.Ld,y.QX,y.vh]})}return l})()},614:(J,G,r)=>{r.d(G,{Qpm:()=>i1,wB1:()=>P2});var P2={prefix:"far",iconName:"face-frown",icon:[512,512,[9785,"frown"],"f119","M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]},i1={prefix:"far",iconName:"face-smile",icon:[512,512,[128578,"smile"],"f118","M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"]}}}]);