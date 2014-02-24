/**
 * Created by jjf001 on 14-2-14.
 */

define(function (require, exports, module) {
    var $ = require('jquery');

    /**
     *
     * @param id
     * @constructor
     */
    function Linkage(id, data) {
        this.container = $(id);
        this.onChange = function(data){};

        if ($.isArray(data)) {
            this.data = data;
        } else {
            this.data = [];
        }
        this.selectors = [];
    }

    module.exports = Linkage;

    /**
     *
     */
    Linkage.prototype.init = function () {
        this._createSelector('0');
    };

    /**
     *
     */
    Linkage.prototype.bind = function () {
        var that = this;

        that.container.bind('selector.change', function (event, index, selector) {
            var id = selector.find("option:selected").attr('name');

            if (index === (that.selectors.length - 1)) {
                //create selector
                that._createSelector(id);
            } else {
                //update selector
                that._updateSelector(index + 1, id);
            }
        });
    };

    /**
     * create select element
     * @param pid
     * @private
     */
    Linkage.prototype._createSelector = function (pid) {
        var that = this;

        var array = $.grep(that.data, function (n) {
            return n.pid == pid;
        });
        if (array.length === 0) {
            that.onChange($.grep(that.data, function (n) { return n.id == pid; })[0]);
            return;
        }

        var selector = $('<select></select>');
        that.selectors.push(selector);

        for (var i = 0; i < array.length; i++) {
            var tmp = array[i];
            var html = '<option name="' + tmp.id + '">' + tmp.name + '</option>';
            var option = $(html);
            selector.append(option);
        }

        that.container.append(selector);
        selector.bind('change', function (event) {
            that.container.trigger('selector.change', [$.inArray(selector, that.selectors), selector]);
        });

        //call itself to create child selector
        var id = selector.find("option:selected").attr('name');
        that._createSelector(id);
    };

    /**
     * update selector
     * @param index
     * @param pid
     * @private
     */
    Linkage.prototype._updateSelector = function (index, pid) {
        var that = this;

        var array = $.grep(that.data, function (n) {
            return n.pid == pid;
        });
        if (array.length === 0) {
            $.each(that.selectors.splice(index), function(i, v){
                v.remove();
            });
            that.onChange($.grep(that.data, function (n) { return n.id == pid; })[0]);
            return;
        }

        var selector = that.selectors[index];
        //clear all old option
        selector.empty();
        for (var i = 0; i < array.length; i++) {
            var tmp = array[i];
            var html = '<option name="' + tmp.id + '">' + tmp.name + '</option>';
            var option = $(html);
            selector.append(option);
        }

        //update child selector
        var id = selector.find("option:selected").attr('name');
        that._updateSelector(index + 1, id);
    };
});