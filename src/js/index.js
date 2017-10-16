/* !
 *  首页
 *  author: lingweifeng
 *  date: 2016-11-06 
 */

var Index = {
	// 初始化
	init: function(){

		// 首页月份滚动事件		
		var self = this,
			$dateScroll = $( '#dateScroll' ),
			$dateScrollItem = $dateScroll.find( 'ul > li' ),
			dateScrollSize = $dateScrollItem.length,
			itemWidth = $dateScrollItem.width();

		$dateScroll.find( 'ul' ).width( dateScrollSize*itemWidth );
		var dateScroll = new IScroll('#dateScroll', { scrollX: true, momentum: false, snap: 'li' });
		dateScroll.goToPage( 1, 0, 1000 );
		// 监听滚动事件
		dateScroll.on( 'scrollEnd', function () {
		    var current = this.currentPage.pageX,
		    	$currentLi = $dateScrollItem.eq( current ),
		    	currentDate = $currentLi.data( 'date' );  // 取得当面滚动到第几月
		    console.log( currentDate );
		    $currentLi.addClass( 'current' ).siblings().removeClass( 'current' );
		});
	}

};

$(function(){
	//初始化
	Index.init();
});
