<template>
     <div class="box has-background-info ">
        <h2 class="title has-text-centered">Quickly Add Inventory</h2>
        <!-- <h1 class="title has-text-centered">27</h1>
        <h2 class="subtitle has-text-centered">thousand</h2> -->
        
    </div>    
    <div class="box has-background-danger" >
        <h2 class="title has-text-centered">See price Optimisations</h2>
        <!-- <h1 class="title has-text-centered">4,309</h1> -->
        
    </div>    
    <div class="box has-background-success" >
        <h2 class="title has-text-centered">Find trending items</h2>
        <!-- <h1 class="title has-text-centered">27</h1>
        <h2 class="subtitle has-text-centered">percent</h2> -->
    </div>    
    <div class="box has-background-warning" >
        <h2 class="title has-text-centered">See your site stats</h2>
        <!-- <h1 class="title has-text-centered">9</h1>
        <h2 class="subtitle has-text-centered">units</h2> -->
    </div>       
</template>


<script>
export default {
  name: 'StatsBox',
  props: {
    ColourTheme: String
  }
}


</script>

