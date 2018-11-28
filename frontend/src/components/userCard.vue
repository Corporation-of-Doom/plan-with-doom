<template>
    <el-card shadow="always" style="text-align:center;padding:20px;margin-bottom:10px;height:20%">
        <el-col>
            <font size="+2">{{user.first_name}} {{user.middle_name}} {{user.last_name}}</font>
            <div v-if="user.privacy_settings != 'Private'">
                <p v-if="user.organization"> {{user.organization}} </p>
                <el-row v-if="user.phone_number && user.email">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:left">
                        <p placeholder="email@email.com">Email: {{user.email}}</p>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="text-align:right">
                        <p placeholder="+1 xxx xxx xxxx">Phone: {{user.phone_number}}</p>
                    </el-col>
                </el-row>
                <p v-else-if="user.email" placeholder="email@email.com">Email: {{user.email}}</p>
                <p v-else-if="user.phone_number" placeholder="+1 xxx xxx xxxx">Phone: {{user.phone_number}}</p>
                <i v-if="user.linked_in" @click="onClick('linked_in')" class="mdi mdi-linkedin-box"></i>
                {{user.linked_in}}
                <i v-if="user.twitter" @click="onClick('twitter')" class="mdi mdi-twitter-box"></i>
                {{user.twitter}} <br>
                <i v-if="user.facebook" @click="onClick('facebook')" class="mdi mdi-facebook-box"></i>
                {{user.facebook}}
                <i v-if="user.instagram" @click="onClick('instagram')" class="mdi mdi-instagram"></i>
                {{user.instagram}}
            </div>
        </el-col>
    </el-card>
</template>


<script>
import { detect } from 'detect-browser'
const browser = detect()

export default {
	name: 'UserCard',
	props: {
        hide: {
            type: Boolean,
            default: true
        },
        follow: {
            type: Boolean,
            default: true
        },
        user:{
            type:Object,
            required: true
        },
	},
}
</script>

<style lang="scss">

</style>
