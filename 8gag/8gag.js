if (Meteor.isClient) {
    Template.timeline.created = function () {
        Session.set('pagination', 0);
    };
    Template.timeline.rendered = function () {
        //    http://infinigag.eu01.aws.af.cm/trending/0
        $.getJSON("http://infinigag.eu01.aws.af.cm/trending/" + Session.get('pagination'), function (data) {
            Session.set('9gagdata', data.data);
            console.log(data);
            Session.set('pagination', data.paging.next);
        });

    };
    Template.timeline.events({
        'click #btnLoadMore': function () {
            $.getJSON("http://infinigag.eu01.aws.af.cm/trending/" + Session.get('pagination'), function (data) {
                var xdata = Session.get('9gagdata');
                for(var ii = 0;ii< data.data.length;ii++){
                    xdata.push(data.data[ii]);
                }
                Session.set('9gagdata', xdata);
            });
        }
    });
    Template.timeline.Posts = function () {
        var data = Session.get('9gagdata');
        return data;
    };
    Template.item_post.url = function () {
        return this.images.normal;
    };
    Template.item_post.Caption = function () {
        return this.caption;
    };
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}