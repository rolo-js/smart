define(["modules/forms/module","lodash","fuelux-wizard"],function(a,b){"use strict";return a.registerDirective("smartFueluxWizard",function(){return{restrict:"A",scope:{smartWizardCallback:"&"},link:function(a,c){var d=c.wizard(),e=c.find("form");d.on("actionclicked.fu.wizard",function(a){e.data("validator")&&(e.valid()||(e.data("validator").focusInvalid(),a.preventDefault()))}),d.on("finished.fu.wizard",function(){var c={};b.each(e.serializeArray(),function(a){c[a.name]=a.value}),"function"==typeof a.smartWizardCallback()&&a.smartWizardCallback()(c)})}}})});