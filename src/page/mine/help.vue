<template>
	<transition name="move">
		<div class="help page-animate">
			<v-header>
				<mt-header title="常见问题">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<vue-better-scroll class="wrapper" >
				<div class="content" style="margin-top: 5px;">
					<!-- .dlst以下（包含.dlst）以下为本插件内容，需要的同学可复制里面部分即可。 -->
					<div class="dlst smll-50 fl">
					
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：起息日从哪一天开始计算？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：淘花宅业务的起息日从放款当日开始计息</p>					
							</dd>
						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：如何换钱？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：分期成功后，可在【换钱】处转卖享受回收服务</p>					
							</dd>
						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：换钱后，多久可到账？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：一般5分钟到账，具体以银行到账时间为准</p>					
							</dd>

						</dl>
						
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：同时可申请几次淘花宅分期？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：一次，资料填写一半时，重新购买商品，会重新下单，之前填写资料保留。</p>					
							</dd>

						</dl>
						
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：分期失败后，多久可以重新申请？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：90天后</p>					
							</dd>

						</dl>
						
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：商品发货时间？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：下单通过审核后，系统会根据用户下单的订单顺序进行安排发货，在商品有货的情况下，发出的时间是1-2天内，到货时间一般为2-5天，具体以物流到货时间为准，到货后会有快递人员联系您，请保持电话畅通</p>					
							</dd>

						</dl>
						
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：商品发货物流信息？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：一般订单发货成功后，您在订单中可查看物流公司及单号，具体的物流信息，您可以在物流官网中进行查询</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：物流显示派件，但是几天了仍旧未收到，怎么办？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：若订单商品已超出配送时效，请先查看订单的物流信息；若订单中有配送人员信息，请直接电话联系配送人员，若订单中没有配送人员信息，请联系在线客服为您处理。</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：自动确认收货时间？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：订单发货后10天</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：确认收货后还可以退换货吗？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：不可以，确认收货后，订单将变为交易成功状态，此时无法对订单进行任何操作。</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：商品不满意或者有故障如何申请退换货？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：我们所售商品均为正品行货，享受国家三包政策全国联保。商品如果出现质量问题，可以在线联系客服申请售后。</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：货到签收需注意事项</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：商品到货后请当面拆封，拆商品包装前检查商品外包装是否挤压变形，请保证在配送人员在场的情况下拆开货物包装，发现外观损坏、缺少附件等情况，请先跟配送人员说明情况。并及时联系淘花宅客服</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：退款后需要支付分期利息吗？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：若因商品质量问题并及时退货无需支付任何利息</p>					
							</dd>

						</dl>
						
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：退货接受到付吗？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：退回物流不接受到付</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：如何申请退款？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：分期成功后，可点击退款申请，退款前请先与客服沟通，收到货则选择退货退款，未发货则选择仅退款</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：申请退款后，可撤销申请吗？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：可以，申请后，在系统未审核通过前，点击【取消】，即可撤回申请，申请过后，则可以不填写退回物流，系统在10日之后，交易自动完成。</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：什么情况下，退款申请会不通过？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：商品无质量问题</p>					
							</dd>

						</dl>
					

						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：为什么淘花宅可以快速分期？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：依赖大数据和智能风控的高速处理能力，系统在申请人填写资料的同时，会实时联网查询申请贷款相关行为资料，瞬间获得申请人的征信评分。</p>					
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：淘花宅分期会影响信用吗？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：淘花宅不查询央行征信，也不会在未经您许可的情况下向您的联系人透露贷款情况。</p>
							</dd>
						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：如何使用淘花宅分期？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：您只需在淘花宅微信服务号（taohuazhaiApp），进行注册，下单选择分期支付，并按照提示步骤上传相关资料提交即可。</p>
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：申请人需要什么条件？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：淘花宅目前需要您满足：年龄19-50周岁、拥有稳定的工作及收入、无不良借贷记录等，满足以上条件即可申请淘花宅。需知：以上仅为申请标准，非放款标准。</p>
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：申请淘花宅需要提交什么材料？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：淘花宅需要您提供有效的本人身份证拍照、本人身份证注册的手机号码、工作信息、联系人信息等。</p>

							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：为什么身份证照片上传失败？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：照片上传时您需注意：</p>
		                        <p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">1.使用您本人亲自办理的身份证，拍摄上传非本人身份证会导致上传失败；</p>
		                        <p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">2.拍摄身份证时，尽量对齐边框，并选择光线较好的场所，不要出现反光、过度曝光等情况；</p>
		                        <p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">3.身份证上传后，您需留意照片下方显示的人名、身份证号、地址等信息与原件有无出入，如出现错误显示，请手动修改或重新拍摄。</p>
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：为什么手机服务密码认证失败？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：手机服务密码认证时您需注意：</p>
		                        <p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">1.一个账户只能绑定一个手机号码，且只能是使用您本人身份证办理开通的号码；</p>
		                        <p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">2.在输入手机服务密码前，建议您先用此密码登录您运营商的掌上营业厅，确认密码正确后再登录淘花宅；</p>
		                        <p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">3.如您忘记手机服务密码，可联系您的手机运营商进行找回；</p>
		                        <p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">4.如您在验证手机服务密码时显示网络异常等，可能是您当地的手机运营商正在故障报修，建议您稍后验证。</p>
							</dd>

						</dl>

						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：审核多久可以得到结果？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：最快5分钟出结果，如遇审核高峰请耐心等待。</p>

							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：为什么审核没有通过？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：如您出现资料虚假不实、联系人手机无法拨通等情况，会导致综合评分过低，审核无法通过。请您认真填写申请资料，审核期间保证联系人电话畅通，提高审核成功机率。</p>
							</dd>

						</dl>

						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：支持哪几家银行？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：淘花宅目前支持中国工商银行、中国农业银行、中国建设银行、中国银行、中国交通银行、兴业银行、中信银行、中国光大银行、平安银行、中国邮政储蓄银行、上海银行、浦东发展银行、民生银行、广发银行。</p>
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：绑定提现银行卡失败了怎么办?</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A:如您在提现过程中绑卡失败，请先确认该卡为您本人办理的储蓄卡。如银行预留手机号码、证件信息均为您本人，还是绑卡失败，请您联系客服。</p>
							</dd>
						</dl>

						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：我该如何还款？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：请您在还款日到来前手动还款。您只需登录您的淘花宅账户，点击我要还款，选择还款类型，还款时请您保证卡内有足够余额。</p>
							</dd>

						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：可以提前还款吗？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：淘花宅支持随借随还，利息截止还款当期，后续利息全免。</p>
							</dd>
						</dl>
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q：如果没有及时还款？</dt>

							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">A：如您产生逾期，除每日利息增加外，还会有罚息的产生，并且对您的个人信用记录造成影响。一旦逾期，请您尽快还款，如需帮助请联系客服。</p>

							</dd>
						</dl>
					</div>	
				</div>
			</vue-better-scroll>	
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import VueBetterScroll from 'vue2-better-scroll' 
	export default {
		name: 'help',
		components: {VHeader,VueBetterScroll},
		data() {
			return {}
		},
		mounted() {
			$(".href-help").addClass("active");
          var helplist = $("[data-sdlder=helplist]");
			var collspe = function() {};
			collspe.prototype.toggle = function(o) {
				if(o.hasClass('active')) {
					return o.toggleClass("active").find("dd").slideUp();

				};
				helplist.removeClass("active").find("dd").slideUp();
				o.toggleClass("active").find("dd").slideDown();
			};
			helplist.click(function() {
				collspe.prototype.toggle($(this));

			});
		},
		methods: {
			toBack() {
				this.$router.back();
			}
		}
	}
</script>
<style lang="scss">
.help{
	dt{
		border-bottom: 0;
		padding: 14px 20px 14px 0;
		background: url(/thz/static/icon_moredowm@2x.png) right no-repeat;
		background-size: 20px 20px;
		margin-left: 20px;
		margin-right: 20px;
	}
	
	dl {
		position: relative;
		background: #fff;
		&:after{
			position: absolute;
			background: #D9D9D9;
			content: "";
			height: 1px;
			width: 100%;
			bottom: 0;
			right:0;
			z-index: 2;
			transform:scaleY(0.5); 
		}
	}
	
	dl.active {
		border-bottom: 0;
	}
	
	dl.active dt {
		background: url(/thz/static/up1@2x.png) right no-repeat;
		background-size: 20px 20px;
		
	}
	
	dd {
		color: rgb(74, 144, 226);
		background: #fafafa;
	}
	p{
		text-align:justify;
	}
		
}
</style>



