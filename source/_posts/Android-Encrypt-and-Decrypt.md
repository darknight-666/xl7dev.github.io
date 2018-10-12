---
title: Android Encrypt and Decrypt
date: 2016-09-22 11:15:19
tags: Android 
---

### 0x01 Base64
> Encrypt

```
import android.util.Base64;
String str = "hello world";
String base64str = Base64.encodeToString(str.getBytes(),Base64.DEFAULT);
```
> Decrypt

```
byte[] m = Base64.decode(base64str,Base64.DEFAULT);
```
### 0x02 AES
```
import java.security.SecureRandom;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
/**
 * Usage:
 * <pre>
 * String crypto = SimpleCrypto.encrypt(masterpassword, cleartext)
 * String cleartext = SimpleCrypto.decrypt(masterpassword, crypto)
 * </pre>
 */
public class SimpleCrypto {
    public static String encrypt(String seed, String cleartext)
            throws Exception {
        byte[] rawKey = getRawKey(seed.getBytes());
        byte[] result = encrypt(rawKey, cleartext.getBytes());
        return toHex(result);
    }
    public static String decrypt(String seed, String encrypted)
            throws Exception {
        byte[] rawKey = getRawKey(seed.getBytes());
        byte[] enc = toByte(encrypted);
        byte[] result = decrypt(rawKey, enc);
        return new String(result);
    }
    private static byte[] getRawKey(byte[] seed) throws Exception {
        KeyGenerator kgen = KeyGenerator.getInstance("AES");
        SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
        sr.setSeed(seed);
        kgen.init(128, sr); // 192 and 256 bits may not be available
        SecretKey skey = kgen.generateKey();
        byte[] raw = skey.getEncoded();
        return raw;
    }
    private static byte[] encrypt(byte[] raw, byte[] clear) throws Exception {
        SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec);
        byte[] encrypted = cipher.doFinal(clear);
        return encrypted;
    }
    private static byte[] decrypt(byte[] raw, byte[] encrypted)
            throws Exception {
        SecretKeySpec skeySpec = new SecretKeySpec(raw, "AES");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, skeySpec);
        byte[] decrypted = cipher.doFinal(encrypted);
        return decrypted;
    }
    public static String toHex(String txt) {
        return toHex(txt.getBytes());
    }
    public static String fromHex(String hex) {
        return new String(toByte(hex));
    }
    public static byte[] toByte(String hexString) {
        int len = hexString.length() / 2;
        byte[] result = new byte[len];
        for (int i = 0; i < len; i++)
            result[i] = Integer.valueOf(hexString.substring(2 * i, 2 * i + 2),
                    16).byteValue();
        return result;
    }
    public static String toHex(byte[] buf) {
        if (buf == null)
            return "";
        StringBuffer result = new StringBuffer(2 * buf.length);
        for (int i = 0; i < buf.length; i++) {
            appendHex(result, buf[i]);
        }
        return result.toString();
    }
    private final static String HEX = "0123456789ABCDEF";
    private static void appendHex(StringBuffer sb, byte b) {
        sb.append(HEX.charAt((b >> 4) & 0x0f)).append(HEX.charAt(b & 0x0f));
    }
}
```
### 0x03 DES
```
public class Des4 {  
    // 密钥  如果 密匙不足 8个 字符  java代码 要加 \0
    // 例如 secretKey = "xxxxxxx\0"; 
    // 由于我们后台设置的密匙为7位，造成了一系列的麻烦，后经过查询php            // 文档解决，添加secretKey = "xxxxxxx\0"; 

    private final static String secretKey = "";  
    private static byte[] iv = {0, 0, 0, 0, 0, 0, 0, 0};  

    public static String encode(String plainText) throws Exception {  
        IvParameterSpec zeroIv = new IvParameterSpec(iv);  
        SecretKeySpec key = new SecretKeySpec(secretKey.getBytes(), "DES");  
        Cipher cipher = Cipher.getInstance("DES");  
        cipher.init(Cipher.ENCRYPT_MODE, key, zeroIv);  
        byte[] encryptedData = cipher.doFinal(plainText.getBytes());  
        return Base64.encodeToString(encryptedData, 1);  
    }  

    public static String decode(String encryptText) throws Exception {  
        IvParameterSpec zeroIv = new IvParameterSpec(iv);  
        SecretKeySpec key = new SecretKeySpec(secretKey.getBytes(), "DES");  
        Cipher cipher = Cipher.getInstance("DES");  
        cipher.init(Cipher.DECRYPT_MODE, key, zeroIv);  
        byte[] decryptData = cipher.doFinal(Base64.decode(encryptText, 1));  
        return new String(decryptData);  
    }  
}
```
### 0x04 apk伪加密
> pack

```
import argparse
from zipfile import ZipFile, ZipInfo

class ApkFile(ZipFile):
	def compress(self, member, src_apk):
		if not isinstance(member, ZipInfo):
			member = self.getinfo(member)
		try:
			data_obj = src_apk.open(member, 'r')
			data = data_obj.read()
		except RuntimeError, e:
			print e
			return
		member.flag_bits |= 1
		self.writestr(member, data)
		print 'compressing %s' % member.filename
				
	def compressall(self, src_apk):
		map(lambda entry: self.compress(entry, src_apk), src_apk.filelist)
				
if __name__ == '__main__':
	parser = argparse.ArgumentParser(description='Add the encrypted flag to an APK. \
	src_apk specifies the apk file you want to add encrypted flag, dst_apk is the output apk file.')
	parser.add_argument('src_apk', type=str)
	parser.add_argument('dst_apk', type=str)
	args = parser.parse_args()
	src_apk = ApkFile(args.src_apk, 'r')
	dst_apk = ApkFile(args.dst_apk, 'w')
	dst_apk.compressall(src_apk)
```
> unpack

```
import argparse
from zipfile import ZipFile, ZipInfo

class ApkFile(ZipFile):
	def extract(self, member, path=None, pwd=None):
		if not isinstance(member, ZipInfo):
			member = self.getinfo(member)
		member.flag_bits ^= member.flag_bits%2
		ZipFile.extract(self, member, path, pwd)
		print 'extracting %s' % member.filename
				

	def extractall(self, path=None, members=None, pwd=None):
		map(lambda entry: self.extract(entry, path, pwd), members if members is not None  and len(members)>0 else self.filelist)
				
if __name__ == '__main__':
	parser = argparse.ArgumentParser(description='unpacks an APK that contains files which are wrongly marked as encrypted')
	parser.add_argument('apk', type=str)
	parser.add_argument('file', type=str, nargs='*')
	args = parser.parse_args()

	apk = ApkFile(args.apk,'r')
	apk.extractall(members=args.file)
```