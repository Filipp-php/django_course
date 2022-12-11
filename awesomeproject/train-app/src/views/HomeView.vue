<template>
	<div class="container">
		<video-bg class="vid" :sources="['https://joy.videvo.net/videvo_files/video/free/video0459/large_watermarked/_import_60c593722cd9a6.76835589_preview.mp4']" img="https://joy.videvo.net/videvo_files/video/free/video0458/large_watermarked/_import_60c59183b09766.16800488_preview.mp4">
		<div class="row justify-content-md-center">
			<div class="col-md-6 mt-5">
				<p class="fs-1 text-center text-uppercase">
					Построй свою программу тренировок
				</p>
				<p class="fs-1 text-center text-uppercase">
					просто и быстро
				</p>
			</div>
		</div>
		<br>
		<div class="container">
			<div class ="row justify-content-md-center">
				<div class="card w-75">
					<div class="card-header">
						Цитата
					</div>
					<div class="card-body">
						<blockquote class="blockquote mb-0">
							<p>Лучшая и прогрессивная тренировка та, которую ты составил сам..</p>
							<footer class="blockquote-footer">&copy;</footer>
						</blockquote>
					</div>
				</div>
			</div>
		</div>
		</video-bg>
		<hr size="5">
		<div class="container">
			<div class ="row justify-content-md-center">
				<h4>Основное</h4>
				<br>
				<card-utility title="Конструктор"
				desc="На этом сайте ты можешь создать свою собственную программу тренировок и начать путь к своей цели уже сейчас."
				text_url="Перейти в конструктор &raquo; "
				url="/editor">
			</card-utility>
			<card-utility title="Каталог"
			desc="Также на этом сайте ты можешь найти удобную программу тренировок, а также тренера, который поможет тебе в твоих начинаниях."
			text_url="Перейти в каталог &raquo; "
			url="">
		</card-utility>
	</div>
	<br>
	<div class ="row justify-content-md-center">
		<h4>Дополнительно</h4>
		<br>
		<card-utility title="Упражнения"
		desc="Здесь ты можешь изучить основные упражнения"
		text_url="Перейти к списку упражнений &raquo; "
		url="">
	</card-utility>
	<card-utility title="Кроссфит комплексы"
	desc="Здесь находиться список нсновных кроссфит комплексов"
	text_url="Перейти к списку кроссфит комплексов &raquo; "
	url="">
</card-utility>
</div>
</div>	
</div>	
</template>

<script>
import CardUtility from '@/components/utilities/CardUtility.vue'
import VideoBg from 'vue-videobg'
export default {
	name: 'HomeView',
	components: {
		CardUtility,
		VideoBg
	}
}
</script>

<style scoped>

.card { background-color: rgba(245, 245, 245, 0.3); }

</style>