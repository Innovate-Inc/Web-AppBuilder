///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
/*global define, dojo, dijit, require, esri, console, setTimeout*/
define(
  ["dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/on",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "jimu/BaseWidgetSetting",
    "jimu/dijit/Message",
    "dojo/text!./BufferUnitEdit.html",
    "dijit/form/ValidationTextBox"
  ],
  function(
    declare,
    lang,
    array,
    on,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    BaseWidgetSetting,
    Message,
    template) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: "buffer-unit-edit",
      templateString: template,
      _bufferUnits: [{
        "name": "UNIT_FOOT",
        "label": "Feet"
      },{
        "name": "UNIT_KILOMETER",
        "label": "Kilometers"
      },{
        "name": "UNIT_METER",
        "label": "Meter"
      },{
        "name": "UNIT_NAUTICAL_MILE",
        "label": "Nautical miles"
      },{
        "name": "UNIT_STATUTE_MILE",
        "label": "Miles"
      },{
        "name": "UNIT_US_NAUTICAL_MILE",
        "label": "US nautical miles"
      }],
      config:null,

      postCreate: function() {
        this.inherited(arguments);
        this._setConfig(this.config);
      },

      startup: function() {
        this.inherited(arguments);
      },

      _setConfig: function(config) {
        this.config = config;
        if(!this.config){
          return;
        }
        this._initBufferUnitTable();
      },
      
      _initBufferUnitTable:function(){
        this.bufferUnitsTable.clear();
        var bUnits = this.config.bufferUnits.bufferUnit;
        array.forEach(this._bufferUnits, lang.hitch(this, function(bufferunit) {
          var args = {
            config:bufferunit,
            exists: this._inArray(bUnits, bufferunit.name)
          };
          this._createBufferUnit(args);
        }));
      },
      
      _inArray:function(array, name){
        for(var i=0;i<array.length;i++) {
          if(array[i].name === name){
            return true;
          }
        }
        return false;
      },
      
      _createBufferUnit:function(args){
        args.searchSetting = this;
        args.nls = this.nls;
        var rowData = {
          add: args.exists,
          label: (args.config && args.config.label)||'',
          name: (args.config && args.config.name)||''
        };
        var result = this.bufferUnitsTable.addRow(rowData);
        if(!result.success){
          return null;
        }
        return result.tr;
      },

      getConfig: function() {      
        var trs = this.bufferUnitsTable.getRowDataArrayByFieldValue("add",true);
        var allBufferUnits = array.map(trs,lang.hitch(this,function(item){
          delete item.add;
          return item;
        }));
        return allBufferUnits;
      }
    });
  });