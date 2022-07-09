package com.poex.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * @@author Chathura Wijesinghe <cdanasiri@gmail.com>
 * <p>
 * <receiver android:name=".SMSReceiver" >
 * <intent-filter>
 * <action android:name="android.provider.Telephony.SMS_RECEIVED"/>
 * </intent-filter>
 * </receiver>
 */
public class SMSReceiver extends BroadcastReceiver {

    private static final String SMS_RECEIVED = "android.provider.Telephony.SMS_RECEIVED";

    private static ArrayList<SMSReceivedListener> smsListener = new ArrayList<SMSReceivedListener>();

    @Override
    public void onReceive(Context context, Intent intent) {
        final String action = intent.getAction();
        final Bundle extras = intent.getExtras();


        if (action.equals(SMSReceiver.SMS_RECEIVED)) {
            System.out.println("received once");
            final boolean smsValid = extras != null;

            if (smsValid) {
                //Create SMSMessages from PDUs in the Bundle
                final Object[] pdus = (Object[]) extras.get("pdus");
                final SmsMessage[] messages = new SmsMessage[pdus.length];
                for (int i = 0; i < pdus.length; i++)
                    messages[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);

                //Assemble
                final ArrayList<SmsMessage> vibrations = new ArrayList<SmsMessage>();

                vibrations.addAll(Arrays.asList(messages));
                for (SMSReceivedListener smsReceivedListner : smsListener)
                    smsReceivedListner.message(vibrations);
            }
        }
    }

    public static void addSMSListner(SMSReceivedListener listener) {
        smsListener.add(listener);
    }

    public static void removeSMSListner(SMSReceivedListener listener) {
        smsListener.remove(listener);
    }

    public interface SMSReceivedListener {
        void message(ArrayList<SmsMessage> message);
    }
}