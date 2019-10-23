<template>
    <div class="cnt_full">
        <div class="cnt">

            <nav class="navigation">
                <ul>


                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                    <li><router-link to="/about">About2</router-link></li>
                    <li><router-link to="/about">About3</router-link></li>

                </ul>
            </nav>
            <p>copyright 2019</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mainFooter"
    }
</script>

<style scoped lang="scss">
    .cnt_full {
        background-color: #cdcdcd;
        width: 100%;
        display: flex;
        justify-content: center;

        .cnt {
            padding: 10px 0;
            width: 100%;
            max-width: 1080px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }


        .navigation {
            ul {
                display: flex;
                padding: 0;
                margin: 0;
                list-style-type: none;
            }

            a {
                display: block;
                margin-left: 10px;
                margin-right: 10px;
            }
        }
    }
</style>