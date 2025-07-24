// Dokumentasi teknis BPJS: signature & decrypt

export type BpjsDocSection = {
  id: string;
  title: string;
  headers: string[];
  signatureFormula?: string;
  authorizationFormula?: string;
  decryptFormula?: string;
  codeExample?: string;
  codeExamples?: { language: string; code: string }[];
  decryptExamples?: { language: string; code: string }[];
  compressExamples?: { language: string; code: string }[];
  encryptExamples?: { language: string; code: string }[];
  description?: string;
};

export const bpjsDocs: BpjsDocSection[] = [
  {
    id: "vclaim",
    title: "VClaim",
    headers: [
      "X-cons-id",
      "X-timestamp",
      "X-signature",
      "user_key"
    ],
    signatureFormula: "signature = HMAC-SHA256(consId + \"&\" + timestamp, secretKey)",
    codeExamples: [
      {
        language: "Java",
        code: `import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\nimport java.io.UnsupportedEncodingException;\nimport java.net.URLEncoder;\nimport java.security.GeneralSecurityException;\n\nimport javax.crypto.Mac;\nimport javax.crypto.spec.SecretKeySpec;\n\nimport org.springframework.security.crypto.codec.Base64;\n\npublic class BpjsApi {\n\n    public static void main(String[] args) throws GeneralSecurityException, IOException {\n\n        String secretKey = \"secretKey\";\n        String salt = \"0123456789\";\n\n        String generateHmacSHA256Signature = generateHmacSHA256Signature(salt, secretKey);\n        System.out.println(\"Signature: \" + generateHmacSHA256Signature);\n\n        String urlEncodedSign = URLEncoder.encode(generateHmacSHA256Signature, \"UTF-8\");\n\n        System.out.println(\"Url encoded value: \" + urlEncodedSign);\n    }\n\n    public static String generateHmacSHA256Signature(String data, String key) throws GeneralSecurityException {\n        byte[] hmacData = null;\n\n        try {\n            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(\"UTF-8\"), \"HmacSHA256\");\n            Mac mac = Mac.getInstance(\"HmacSHA256\");\n            mac.init(secretKey);\n            hmacData = mac.doFinal(data.getBytes(\"UTF-8\"));\n            return new Base64Encoder().encode(hmacData);\n        } catch (UnsupportedEncodingException e) {\n            throw new GeneralSecurityException(e);\n        }\n    }\n}`
      },
      {
        language: "PHP",
        code: `<?php \n   $data = \"testtesttest\";\n   $secretKey = \"secretkey\";\n   // Computes the timestamp\n   date_default_timezone_set('UTC');\n   $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));\n   // Computes the signature by hashing the salt with the secret key as the key\n   $signature = hash_hmac('sha256', $data.&"&".$tStamp, $secretKey, true);\n   // base64 encode…\n   $encodedSignature = base64_encode($signature);\n   // urlencode…\n   // $encodedSignature = urlencode($encodedSignature);\n   echo \"X-cons-id: \" .$data .\" \";\n   echo \"X-timestamp:\" .$tStamp .\" \";\n   echo \"X-signature: \" .$encodedSignature;\n?>`
      },
      {
        language: "C#",
        code: `namespace BpjsIntegration\n{\n    class Program\n    {\n        static void Main()\n        {\n            var data = \"testtesttest\";\n            var secretKey = \"secretkey\";\n            // Initialize the keyed hash object using the secret key as the key\n            HMACSHA256 hashObject = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));\n            // Computes the signature by hashing the salt with the secret key as the key\n            var signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data));\n            // Base 64 Encode\n            var encodedSignature = Convert.ToBase64String(signature);\n            // URLEncode\n            // encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature);\n            Console.WriteLine(\"Voila! A signature: \" + encodedSignature);\n            Console.ReadKey();\n        }\n    }\n}`
      },
      {
        language: "VB.Net",
        code: `Imports System.Security.Cryptography\nImports System.Text\n\nNamespace BpjsIntegration\n    Class Program\n        Private Shared Sub Main()\n            Dim data = \"testtesttest\"\n            Dim secretKey = \"secretkey\"\n            ' Initialize the keyed hash object using the secret key as the key\n            Dim hashObject As New HMACSHA256(Encoding.UTF8.GetBytes(secretKey))\n            ' Computes the signature by hashing the salt with the secret key as the key\n            Dim signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data))\n            ' Base 64 Encode\n            Dim encodedSignature = Convert.ToBase64String(signature)\n            ' URLEncode\n            ' encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature)\n            Console.WriteLine(\"Voila! A signature: \" & encodedSignature)\n            Console.ReadKey()\n        End Sub\n    End Class\nEnd Namespace`
      },
      {
        language: "Ruby",
        code: `# Required Libraries\nrequire 'openssl'\nrequire 'base64'\nrequire 'URI'\n\ndata = \"testtesttest\"\nsecret_key = \"secretkey\"\n\n# URL encode\ndef urlncode(string)\n  URI.escape(string, Regexp.new("[Generating an API Signature^#{URI::PATTERN::UNRESERVED}]"))\nend\n\n# Computes the signature by hashing the salt with the secret key as the key\nhash = OpenSSL::HMAC.digest('sha256', secret_key, data)\n# base64 encode...\n# signature = urlncode(Base64.encode64(hash));`
      },
      {
        language: "Python",
        code: `import hashlib\nimport random\nimport base64\nimport urllib\nimport hmac\n\ndata = \"testtesttest\"\nsecretkey = \"secretkey\"\n\n# Computes the signature by hashing the data with the secret key as the key\nsignature = hmac.new(secretkey, msg=data, digestmod=hashlib.sha256).digest()\n# base64 encode...\nencodedSignature = base64.encodestring(signature).replace('\\n', '')\n# urlencode...\n# encodedSignature = urllib.quote(encodedSignature)\nprint \"Voila! A signature: \" + encodedSignature`
      },
      {
        language: "Cocoa (IOS & Mac)",
        code: `-(NSUInteger)GenerateSalt\n{\n    // random number (change the modulus to the length you'd like)\n    NSUInteger r = arc4random() % 100000;\n    return r;\n}\n\n-(NSString *)GenerateSignatureUsingSalt:(NSUInteger)salt\n{\n    /*\n     Make sure you import:\n     */\n    NSString *key = SECRET_KEY;                                            // define your Secret Key string\n    NSString *data = [NSString stringWithFormat:"%u", salt];            // convert your random number\n    const char *cKey  = [key cStringUsingEncoding:NSUTF8StringEncoding];\n    const char *cData = [data cStringUsingEncoding:NSUTF8StringEncoding];\n    unsigned char cHMAC[CC_SHA256_DIGEST_LENGTH];\n    // Hash the salt with the secret key\n    CCHmac(kCCHmacAlgSHA256, cKey, strlen(cKey), cData, strlen(cData), cHMAC);\n    // Create a data structure\n    NSData *HMAC = [[NSData alloc] initWithBytes:cHMAC\n                                          length:sizeof(cHMAC)];\n    // Base64-encode the signature\n    NSString *hash = [HMAC base64Encoding];\n    return signatureURL;\n}`
      }
    ],
    description:
      `Secara umum, hampir setiap pemanggilan web-service VClaim, harus mencantumkan beberapa variabel pada HTTP Header:\n\n1. X-cons-id: Kode consumer (pengakses web-service) dari BPJS Kesehatan.\n2. X-timestamp: Waktu unix-based (UTC) yang digenerate client.\n3. X-signature: Signature HMAC-SHA256 dari consId & timestamp, menggunakan consumerSecret.\n4. user_key: Key akses webservice.\n\nSignature: HMAC-SHA256(consId + "&" + timestamp, secretKey)\n\nUntuk proses decrypt response, lihat panduan umum di bagian bawah halaman ini.`
  },
  {
    id: "pcare",
    title: "PCare",
    headers: [
      "X-cons-id",
      "X-timestamp",
      "X-signature",
      "X-authorization",
      "user_key"
    ],
    signatureFormula: "signature = HMAC-SHA256(consId + \"&\" + timestamp, secretKey)",
    authorizationFormula: "X-authorization = Base64(username:password:kdAplikasi)",
    codeExamples: [
      {
        language: "Java",
        code: `import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\nimport java.io.UnsupportedEncodingException;\nimport java.net.URLEncoder;\nimport java.security.GeneralSecurityException;\n\nimport javax.crypto.Mac;\nimport javax.crypto.spec.SecretKeySpec;\n\nimport org.springframework.security.crypto.codec.Base64;\n\npublic class BpjsApi {\n\n    public static void main(String[] args) throws GeneralSecurityException, IOException {\n\n        String secretKey = \"secretKey\";\n        String salt = \"0123456789\";\n\n        String generateHmacSHA256Signature = generateHmacSHA256Signature(salt, secretKey);\n        System.out.println(\"Signature: \" + generateHmacSHA256Signature);\n\n        String urlEncodedSign = URLEncoder.encode(generateHmacSHA256Signature, \"UTF-8\");\n\n        System.out.println(\"Url encoded value: \" + urlEncodedSign);\n    }\n\n    public static String generateHmacSHA256Signature(String data, String key) throws GeneralSecurityException {\n        byte[] hmacData = null;\n\n        try {\n            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(\"UTF-8\"), \"HmacSHA256\");\n            Mac mac = Mac.getInstance(\"HmacSHA256\");\n            mac.init(secretKey);\n            hmacData = mac.doFinal(data.getBytes(\"UTF-8\"));\n            return new Base64Encoder().encode(hmacData);\n        } catch (UnsupportedEncodingException e) {\n            throw new GeneralSecurityException(e);\n        }\n    }\n}`
      },
      {
        language: "PHP",
        code: `<?php \n   $data = \"testtesttest\";\n   $secretKey = \"secretkey\";\n   // Computes the timestamp\n   date_default_timezone_set('UTC');\n   $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));\n   // Computes the signature by hashing the salt with the secret key as the key\n   $signature = hash_hmac('sha256', $data.&"&".$tStamp, $secretKey, true);\n   // base64 encode…\n   $encodedSignature = base64_encode($signature);\n   // urlencode…\n   // $encodedSignature = urlencode($encodedSignature);\n   echo \"X-cons-id: \" .$data .\" \";\n   echo \"X-timestamp:\" .$tStamp .\" \";\n   echo \"X-signature: \" .$encodedSignature;\n?>`
      },
      {
        language: "C#",
        code: `namespace BpjsIntegration\n{\n    class Program\n    {\n        static void Main()\n        {\n            var data = \"testtesttest\";\n            var secretKey = \"secretkey\";\n            // Initialize the keyed hash object using the secret key as the key\n            HMACSHA256 hashObject = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));\n            // Computes the signature by hashing the salt with the secret key as the key\n            var signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data));\n            // Base 64 Encode\n            var encodedSignature = Convert.ToBase64String(signature);\n            // URLEncode\n            // encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature);\n            Console.WriteLine(\"Voila! A signature: \" + encodedSignature);\n            Console.ReadKey();\n        }\n    }\n}`
      },
      {
        language: "VB.Net",
        code: `Imports System.Security.Cryptography\nImports System.Text\n\nNamespace BpjsIntegration\n    Class Program\n        Private Shared Sub Main()\n            Dim data = \"testtesttest\"\n            Dim secretKey = \"secretkey\"\n            ' Initialize the keyed hash object using the secret key as the key\n            Dim hashObject As New HMACSHA256(Encoding.UTF8.GetBytes(secretKey))\n            ' Computes the signature by hashing the salt with the secret key as the key\n            Dim signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data))\n            ' Base 64 Encode\n            Dim encodedSignature = Convert.ToBase64String(signature)\n            ' URLEncode\n            ' encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature)\n            Console.WriteLine(\"Voila! A signature: \" & encodedSignature)\n            Console.ReadKey()\n        End Sub\n    End Class\nEnd Namespace`
      },
      {
        language: "Ruby",
        code: `# Required Libraries\nrequire 'openssl'\nrequire 'base64'\nrequire 'URI'\n\ndata = \"testtesttest\"\nsecret_key = \"secretkey\"\n\n# URL encode\ndef urlncode(string)\n  URI.escape(string, Regexp.new("[Generating an API Signature^#{URI::PATTERN::UNRESERVED}]"))\nend\n\n# Computes the signature by hashing the salt with the secret key as the key\nhash = OpenSSL::HMAC.digest('sha256', secret_key, data)\n# base64 encode...\n# signature = urlncode(Base64.encode64(hash));`
      },
      {
        language: "Python",
        code: `import hashlib\nimport random\nimport base64\nimport urllib\nimport hmac\n\ndata = \"testtesttest\"\nsecretkey = \"secretkey\"\n\n# Computes the signature by hashing the data with the secret key as the key\nsignature = hmac.new(secretkey, msg=data, digestmod=hashlib.sha256).digest()\n# base64 encode...\nencodedSignature = base64.encodestring(signature).replace('\\n', '')\n# urlencode...\n# encodedSignature = urllib.quote(encodedSignature)\nprint \"Voila! A signature: \" + encodedSignature`
      },
      {
        language: "Cocoa (IOS & Mac)",
        code: `-(NSUInteger)GenerateSalt\n{\n    // random number (change the modulus to the length you'd like)\n    NSUInteger r = arc4random() % 100000;\n    return r;\n}\n\n-(NSString *)GenerateSignatureUsingSalt:(NSUInteger)salt\n{\n    /*\n     Make sure you import:\n     */\n    NSString *key = SECRET_KEY;                                            // define your Secret Key string\n    NSString *data = [NSString stringWithFormat:"%u", salt];            // convert your random number\n    const char *cKey  = [key cStringUsingEncoding:NSUTF8StringEncoding];\n    const char *cData = [data cStringUsingEncoding:NSUTF8StringEncoding];\n    unsigned char cHMAC[CC_SHA256_DIGEST_LENGTH];\n    // Hash the salt with the secret key\n    CCHmac(kCCHmacAlgSHA256, cKey, strlen(cKey), cData, strlen(cData), cHMAC);\n    // Create a data structure\n    NSData *HMAC = [[NSData alloc] initWithBytes:cHMAC\n                                          length:sizeof(cHMAC)];\n    // Base64-encode the signature\n    NSString *hash = [HMAC base64Encoding];\n    return signatureURL;\n}`
      }
    ],
    description:
      `Setiap pemanggilan web-service PCare harus mencantumkan header berikut:\n\n1. X-cons-id: Kode consumer (pengakses web-service) dari BPJS Kesehatan.\n2. X-timestamp: Waktu unix-based (UTC) yang digenerate client.\n3. X-signature: Signature HMAC-SHA256 dari consId & timestamp, menggunakan consumerSecret.\n4. X-authorization: Base64(username:password:kdAplikasi)\n5. user_key: Key akses webservice.\n\nSignature: HMAC-SHA256(consId + "&" + timestamp, secretKey)\nX-authorization: Base64(username:password:kdAplikasi)\n\nUntuk proses decrypt response, lihat panduan umum di bagian bawah halaman ini.`
  },
  {
    id: "icare-fkrtl",
    title: "iCare FKRTL",
    headers: [
      "X-cons-id",
      "X-timestamp",
      "X-signature",
      "user_key"
    ],
    signatureFormula: "signature = HMAC-SHA256(consId + \"&\" + timestamp, secretKey)",
    codeExamples: [
      {
        language: "Java",
        code: `import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\nimport java.io.UnsupportedEncodingException;\nimport java.net.URLEncoder;\nimport java.security.GeneralSecurityException;\n\nimport javax.crypto.Mac;\nimport javax.crypto.spec.SecretKeySpec;\n\nimport org.springframework.security.crypto.codec.Base64;\n\npublic class BpjsApi {\n\n    public static void main(String[] args) throws GeneralSecurityException, IOException {\n\n        String secretKey = \"secretKey\";\n        String salt = \"0123456789\";\n\n        String generateHmacSHA256Signature = generateHmacSHA256Signature(salt, secretKey);\n        System.out.println(\"Signature: \" + generateHmacSHA256Signature);\n\n        String urlEncodedSign = URLEncoder.encode(generateHmacSHA256Signature, \"UTF-8\");\n\n        System.out.println(\"Url encoded value: \" + urlEncodedSign);\n    }\n\n    public static String generateHmacSHA256Signature(String data, String key) throws GeneralSecurityException {\n        byte[] hmacData = null;\n\n        try {\n            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(\"UTF-8\"), \"HmacSHA256\");\n            Mac mac = Mac.getInstance(\"HmacSHA256\");\n            mac.init(secretKey);\n            hmacData = mac.doFinal(data.getBytes(\"UTF-8\"));\n            return new Base64Encoder().encode(hmacData);\n        } catch (UnsupportedEncodingException e) {\n            throw new GeneralSecurityException(e);\n        }\n    }\n}`
      },
      {
        language: "PHP",
        code: `<?php \n   $data = \"testtesttest\";\n   $secretKey = \"secretkey\";\n   // Computes the timestamp\n   date_default_timezone_set('UTC');\n   $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));\n   // Computes the signature by hashing the salt with the secret key as the key\n   $signature = hash_hmac('sha256', $data.&"&".$tStamp, $secretKey, true);\n   // base64 encode…\n   $encodedSignature = base64_encode($signature);\n   // urlencode…\n   // $encodedSignature = urlencode($encodedSignature);\n   echo \"X-cons-id: \" .$data .\" \";\n   echo \"X-timestamp:\" .$tStamp .\" \";\n   echo \"X-signature: \" .$encodedSignature;\n?>`
      },
      {
        language: "C#",
        code: `namespace BpjsIntegration\n{\n    class Program\n    {\n        static void Main()\n        {\n            var data = \"testtesttest\";\n            var secretKey = \"secretkey\";\n            // Initialize the keyed hash object using the secret key as the key\n            HMACSHA256 hashObject = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));\n            // Computes the signature by hashing the salt with the secret key as the key\n            var signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data));\n            // Base 64 Encode\n            var encodedSignature = Convert.ToBase64String(signature);\n            // URLEncode\n            // encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature);\n            Console.WriteLine(\"Voila! A signature: \" + encodedSignature);\n            Console.ReadKey();\n        }\n    }\n}`
      },
      {
        language: "VB.Net",
        code: `Imports System.Security.Cryptography\nImports System.Text\n\nNamespace BpjsIntegration\n    Class Program\n        Private Shared Sub Main()\n            Dim data = \"testtesttest\"\n            Dim secretKey = \"secretkey\"\n            ' Initialize the keyed hash object using the secret key as the key\n            Dim hashObject As New HMACSHA256(Encoding.UTF8.GetBytes(secretKey))\n            ' Computes the signature by hashing the salt with the secret key as the key\n            Dim signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data))\n            ' Base 64 Encode\n            Dim encodedSignature = Convert.ToBase64String(signature)\n            ' URLEncode\n            ' encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature)\n            Console.WriteLine(\"Voila! A signature: \" & encodedSignature)\n            Console.ReadKey()\n        End Sub\n    End Class\nEnd Namespace`
      },
      {
        language: "Ruby",
        code: `# Required Libraries\nrequire 'openssl'\nrequire 'base64'\nrequire 'URI'\n\ndata = \"testtesttest\"\nsecret_key = \"secretkey\"\n\n# URL encode\ndef urlncode(string)\n  URI.escape(string, Regexp.new("[Generating an API Signature^#{URI::PATTERN::UNRESERVED}]"))\nend\n\n# Computes the signature by hashing the salt with the secret key as the key\nhash = OpenSSL::HMAC.digest('sha256', secret_key, data)\n# base64 encode...\n# signature = urlncode(Base64.encode64(hash));`
      },
      {
        language: "Python",
        code: `import hashlib\nimport random\nimport base64\nimport urllib\nimport hmac\n\ndata = \"testtesttest\"\nsecretkey = \"secretkey\"\n\n# Computes the signature by hashing the data with the secret key as the key\nsignature = hmac.new(secretkey, msg=data, digestmod=hashlib.sha256).digest()\n# base64 encode...\nencodedSignature = base64.encodestring(signature).replace('\\n', '')\n# urlencode...\n# encodedSignature = urllib.quote(encodedSignature)\nprint \"Voila! A signature: \" + encodedSignature`
      },
      {
        language: "Cocoa (IOS & Mac)",
        code: `-(NSUInteger)GenerateSalt\n{\n    // random number (change the modulus to the length you'd like)\n    NSUInteger r = arc4random() % 100000;\n    return r;\n}\n\n-(NSString *)GenerateSignatureUsingSalt:(NSUInteger)salt\n{\n    /*\n     Make sure you import:\n     */\n    NSString *key = SECRET_KEY;                                            // define your Secret Key string\n    NSString *data = [NSString stringWithFormat:"%u", salt];            // convert your random number\n    const char *cKey  = [key cStringUsingEncoding:NSUTF8StringEncoding];\n    const char *cData = [data cStringUsingEncoding:NSUTF8StringEncoding];\n    unsigned char cHMAC[CC_SHA256_DIGEST_LENGTH];\n    // Hash the salt with the secret key\n    CCHmac(kCCHmacAlgSHA256, cKey, strlen(cKey), cData, strlen(cData), cHMAC);\n    // Create a data structure\n    NSData *HMAC = [[NSData alloc] initWithBytes:cHMAC\n                                          length:sizeof(cHMAC)];\n    // Base64-encode the signature\n    NSString *hash = [HMAC base64Encoding];\n    return signatureURL;\n}`
      }
    ],
    description:
      `Setiap pemanggilan web-service iCare FKRTL harus mencantumkan header berikut:\n\n1. X-cons-id: Kode consumer (pengakses web-service) dari BPJS Kesehatan.\n2. X-timestamp: Waktu unix-based (UTC) yang digenerate client.\n3. X-signature: Signature HMAC-SHA256 dari consId & timestamp, menggunakan consumerSecret.\n4. user_key: Key akses webservice.\n\nSignature: HMAC-SHA256(consId + "&" + timestamp, secretKey)\n\nUntuk proses decrypt response, lihat panduan umum di bagian bawah halaman ini.`
  },
  {
    id: "icare-fktp",
    title: "iCare FKTP",
    headers: [
      "X-cons-id",
      "X-timestamp",
      "X-signature",
      "X-authorization",
      "user_key"
    ],
    signatureFormula: "signature = HMAC-SHA256(consId + \"&\" + timestamp, secretKey)",
    authorizationFormula: "X-authorization = Base64(username:password:kdAplikasi)",
    codeExamples: [
      {
        language: "Java",
        code: `import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\nimport java.io.UnsupportedEncodingException;\nimport java.net.URLEncoder;\nimport java.security.GeneralSecurityException;\n\nimport javax.crypto.Mac;\nimport javax.crypto.spec.SecretKeySpec;\n\nimport org.springframework.security.crypto.codec.Base64;\n\npublic class BpjsApi {\n\n    public static void main(String[] args) throws GeneralSecurityException, IOException {\n\n        String secretKey = \"secretKey\";\n        String salt = \"0123456789\";\n\n        String generateHmacSHA256Signature = generateHmacSHA256Signature(salt, secretKey);\n        System.out.println(\"Signature: \" + generateHmacSHA256Signature);\n\n        String urlEncodedSign = URLEncoder.encode(generateHmacSHA256Signature, \"UTF-8\");\n\n        System.out.println(\"Url encoded value: \" + urlEncodedSign);\n    }\n\n    public static String generateHmacSHA256Signature(String data, String key) throws GeneralSecurityException {\n        byte[] hmacData = null;\n\n        try {\n            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(\"UTF-8\"), \"HmacSHA256\");\n            Mac mac = Mac.getInstance(\"HmacSHA256\");\n            mac.init(secretKey);\n            hmacData = mac.doFinal(data.getBytes(\"UTF-8\"));\n            return new Base64Encoder().encode(hmacData);\n        } catch (UnsupportedEncodingException e) {\n            throw new GeneralSecurityException(e);\n        }\n    }\n}`
      },
      {
        language: "PHP",
        code: `<?php \n   $data = \"testtesttest\";\n   $secretKey = \"secretkey\";\n   // Computes the timestamp\n   date_default_timezone_set('UTC');\n   $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));\n   // Computes the signature by hashing the salt with the secret key as the key\n   $signature = hash_hmac('sha256', $data.&"&".$tStamp, $secretKey, true);\n   // base64 encode…\n   $encodedSignature = base64_encode($signature);\n   // urlencode…\n   // $encodedSignature = urlencode($encodedSignature);\n   echo \"X-cons-id: \" .$data .\" \";\n   echo \"X-timestamp:\" .$tStamp .\" \";\n   echo \"X-signature: \" .$encodedSignature;\n?>`
      },
      {
        language: "C#",
        code: `namespace BpjsIntegration\n{\n    class Program\n    {\n        static void Main()\n        {\n            var data = \"testtesttest\";\n            var secretKey = \"secretkey\";\n            // Initialize the keyed hash object using the secret key as the key\n            HMACSHA256 hashObject = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));\n            // Computes the signature by hashing the salt with the secret key as the key\n            var signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data));\n            // Base 64 Encode\n            var encodedSignature = Convert.ToBase64String(signature);\n            // URLEncode\n            // encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature);\n            Console.WriteLine(\"Voila! A signature: \" + encodedSignature);\n            Console.ReadKey();\n        }\n    }\n}`
      },
      {
        language: "VB.Net",
        code: `Imports System.Security.Cryptography\nImports System.Text\n\nNamespace BpjsIntegration\n    Class Program\n        Private Shared Sub Main()\n            Dim data = \"testtesttest\"\n            Dim secretKey = \"secretkey\"\n            ' Initialize the keyed hash object using the secret key as the key\n            Dim hashObject As New HMACSHA256(Encoding.UTF8.GetBytes(secretKey))\n            ' Computes the signature by hashing the salt with the secret key as the key\n            Dim signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data))\n            ' Base 64 Encode\n            Dim encodedSignature = Convert.ToBase64String(signature)\n            ' URLEncode\n            ' encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature)\n            Console.WriteLine(\"Voila! A signature: \" & encodedSignature)\n            Console.ReadKey()\n        End Sub\n    End Class\nEnd Namespace`
      },
      {
        language: "Ruby",
        code: `# Required Libraries\nrequire 'openssl'\nrequire 'base64'\nrequire 'URI'\n\ndata = \"testtesttest\"\nsecret_key = \"secretkey\"\n\n# URL encode\ndef urlncode(string)\n  URI.escape(string, Regexp.new("[Generating an API Signature^#{URI::PATTERN::UNRESERVED}]"))\nend\n\n# Computes the signature by hashing the salt with the secret key as the key\nhash = OpenSSL::HMAC.digest('sha256', secret_key, data)\n# base64 encode...\n# signature = urlncode(Base64.encode64(hash));`
      },
      {
        language: "Python",
        code: `import hashlib\nimport random\nimport base64\nimport urllib\nimport hmac\n\ndata = \"testtesttest\"\nsecretkey = \"secretkey\"\n\n# Computes the signature by hashing the data with the secret key as the key\nsignature = hmac.new(secretkey, msg=data, digestmod=hashlib.sha256).digest()\n# base64 encode...\nencodedSignature = base64.encodestring(signature).replace('\\n', '')\n# urlencode...\n# encodedSignature = urllib.quote(encodedSignature)\nprint \"Voila! A signature: \" + encodedSignature`
      },
      {
        language: "Cocoa (IOS & Mac)",
        code: `-(NSUInteger)GenerateSalt\n{\n    // random number (change the modulus to the length you'd like)\n    NSUInteger r = arc4random() % 100000;\n    return r;\n}\n\n-(NSString *)GenerateSignatureUsingSalt:(NSUInteger)salt\n{\n    /*\n     Make sure you import:\n     */\n    NSString *key = SECRET_KEY;                                            // define your Secret Key string\n    NSString *data = [NSString stringWithFormat:"%u", salt];            // convert your random number\n    const char *cKey  = [key cStringUsingEncoding:NSUTF8StringEncoding];\n    const char *cData = [data cStringUsingEncoding:NSUTF8StringEncoding];\n    unsigned char cHMAC[CC_SHA256_DIGEST_LENGTH];\n    // Hash the salt with the secret key\n    CCHmac(kCCHmacAlgSHA256, cKey, strlen(cKey), cData, strlen(cData), cHMAC);\n    // Create a data structure\n    NSData *HMAC = [[NSData alloc] initWithBytes:cHMAC\n                                          length:sizeof(cHMAC)];\n    // Base64-encode the signature\n    NSString *hash = [HMAC base64Encoding];\n    return signatureURL;\n}`
      }
    ],
    description:
      `Setiap pemanggilan web-service iCare FKTP harus mencantumkan header berikut:\n\n1. X-cons-id: Kode consumer (pengakses web-service) dari BPJS Kesehatan.\n2. X-timestamp: Waktu unix-based (UTC) yang digenerate client.\n3. X-signature: Signature HMAC-SHA256 dari consId & timestamp, menggunakan consumerSecret.\n4. X-authorization: Base64(username:password:kdAplikasi)\n5. user_key: Key akses webservice.\n\nSignature: HMAC-SHA256(consId + "&" + timestamp, secretKey)\nX-authorization: Base64(username:password:kdAplikasi)\n\nUntuk proses decrypt response, lihat panduan umum di bagian bawah halaman ini.`
  },
  {
    id: "rekammedis-help",
    title: "WS Rekam Medis (Help)",
    headers: [
      "X-cons-id",
      "X-timestamp",
      "X-signature"
    ],
    signatureFormula: "signature = HMAC-SHA256(consId + \"&\" + timestamp, secretKey)",
    codeExamples: [
      {
        language: "Java",
        code: `import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\nimport java.io.UnsupportedEncodingException;\nimport java.net.URLEncoder;\nimport java.security.GeneralSecurityException;\n\nimport javax.crypto.Mac;\nimport javax.crypto.spec.SecretKeySpec;\n\nimport org.springframework.security.crypto.codec.Base64;\n\npublic class BpjsApi {\n\n    public static void main(String[] args) throws GeneralSecurityException, IOException {\n\n        String secretKey = \"secretKey\";\n        String salt = \"0123456789\";\n\n        String generateHmacSHA256Signature = generateHmacSHA256Signature(salt, secretKey);\n        System.out.println(\"Signature: \" + generateHmacSHA256Signature);\n\n        String urlEncodedSign = URLEncoder.encode(generateHmacSHA256Signature, \"UTF-8\");\n\n        System.out.println(\"Url encoded value: \" + urlEncodedSign);\n    }\n\n    public static String generateHmacSHA256Signature(String data, String key) throws GeneralSecurityException {\n        byte[] hmacData = null;\n\n        try {\n            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(\"UTF-8\"), \"HmacSHA256\");\n            Mac mac = Mac.getInstance(\"HmacSHA256\");\n            mac.init(secretKey);\n            hmacData = mac.doFinal(data.getBytes(\"UTF-8\"));\n            return new Base64Encoder().encode(hmacData);\n        } catch (UnsupportedEncodingException e) {\n            throw new GeneralSecurityException(e);\n        }\n    }\n}`
      },
      {
        language: "PHP",
        code: `<?php \n   $data = \"testtesttest\";\n   $secretKey = \"secretkey\";\n   // Computes the timestamp\n   date_default_timezone_set('UTC');\n   $tStamp = strval(time()-strtotime('1970-01-01 00:00:00'));\n   // Computes the signature by hashing the salt with the secret key as the key\n   $signature = hash_hmac('sha256', $data.&"&".$tStamp, $secretKey, true);\n   // base64 encode…\n   $encodedSignature = base64_encode($signature);\n   // urlencode…\n   // $encodedSignature = urlencode($encodedSignature);\n   echo \"X-cons-id: \" .$data .\" \";\n   echo \"X-timestamp:\" .$tStamp .\" \";\n   echo \"X-signature: \" .$encodedSignature;\n?>`
      },
      {
        language: "C#",
        code: `namespace BpjsIntegration\n{\n    class Program\n    {\n        static void Main()\n        {\n            var data = \"testtesttest\";\n            var secretKey = \"secretkey\";\n            // Initialize the keyed hash object using the secret key as the key\n            HMACSHA256 hashObject = new HMACSHA256(Encoding.UTF8.GetBytes(secretKey));\n            // Computes the signature by hashing the salt with the secret key as the key\n            var signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data));\n            // Base 64 Encode\n            var encodedSignature = Convert.ToBase64String(signature);\n            // URLEncode\n            // encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature);\n            Console.WriteLine(\"Voila! A signature: \" + encodedSignature);\n            Console.ReadKey();\n        }\n    }\n}`
      },
      {
        language: "VB.Net",
        code: `Imports System.Security.Cryptography\nImports System.Text\n\nNamespace BpjsIntegration\n    Class Program\n        Private Shared Sub Main()\n            Dim data = \"testtesttest\"\n            Dim secretKey = \"secretkey\"\n            ' Initialize the keyed hash object using the secret key as the key\n            Dim hashObject As New HMACSHA256(Encoding.UTF8.GetBytes(secretKey))\n            ' Computes the signature by hashing the salt with the secret key as the key\n            Dim signature = hashObject.ComputeHash(Encoding.UTF8.GetBytes(data))\n            ' Base 64 Encode\n            Dim encodedSignature = Convert.ToBase64String(signature)\n            ' URLEncode\n            ' encodedSignature = System.Web.HttpUtility.UrlEncode(encodedSignature)\n            Console.WriteLine(\"Voila! A signature: \" & encodedSignature)\n            Console.ReadKey()\n        End Sub\n    End Class\nEnd Namespace`
      },
      {
        language: "Ruby",
        code: `# Required Libraries\nrequire 'openssl'\nrequire 'base64'\nrequire 'URI'\n\ndata = \"testtesttest\"\nsecret_key = \"secretkey\"\n\n# URL encode\ndef urlncode(string)\n  URI.escape(string, Regexp.new("[Generating an API Signature^#{URI::PATTERN::UNRESERVED}]"))\nend\n\n# Computes the signature by hashing the salt with the secret key as the key\nhash = OpenSSL::HMAC.digest('sha256', secret_key, data)\n# base64 encode...\n# signature = urlncode(Base64.encode64(hash));`
      },
      {
        language: "Python",
        code: `import hashlib\nimport random\nimport base64\nimport urllib\nimport hmac\n\ndata = \"testtesttest\"\nsecretkey = \"secretkey\"\n\n# Computes the signature by hashing the data with the secret key as the key\nsignature = hmac.new(secretkey, msg=data, digestmod=hashlib.sha256).digest()\n# base64 encode...\nencodedSignature = base64.encodestring(signature).replace('\\n', '')\n# urlencode...\n# encodedSignature = urllib.quote(encodedSignature)\nprint \"Voila! A signature: \" + encodedSignature`
      },
      {
        language: "Cocoa (IOS & Mac)",
        code: `-(NSUInteger)GenerateSalt\n{\n    // random number (change the modulus to the length you'd like)\n    NSUInteger r = arc4random() % 100000;\n    return r;\n}\n\n-(NSString *)GenerateSignatureUsingSalt:(NSUInteger)salt\n{\n    /*\n     Make sure you import:\n     */\n    NSString *key = SECRET_KEY;                                            // define your Secret Key string\n    NSString *data = [NSString stringWithFormat:"%u", salt];            // convert your random number\n    const char *cKey  = [key cStringUsingEncoding:NSUTF8StringEncoding];\n    const char *cData = [data cStringUsingEncoding:NSUTF8StringEncoding];\n    unsigned char cHMAC[CC_SHA256_DIGEST_LENGTH];\n    // Hash the salt with the secret key\n    CCHmac(kCCHmacAlgSHA256, cKey, strlen(cKey), cData, strlen(cData), cHMAC);\n    // Create a data structure\n    NSData *HMAC = [[NSData alloc] initWithBytes:cHMAC\n                                          length:sizeof(cHMAC)];\n    // Base64-encode the signature\n    NSString *hash = [HMAC base64Encoding];\n    return signatureURL;\n}`
      }
    ],
    compressExamples: [
      {
        language: "Java",
        code: `import java.io.ByteArrayOutputStream;\nimport java.io.IOException;\nimport java.util.zip.GZIPOutputStream;\n\npublic class Main {\n  public static String compress(String str) throws IOException {\n    if (str == null || str.length() == 0) {\n      return str;\n    }\n    ByteArrayOutputStream out = new ByteArrayOutputStream();\n    GZIPOutputStream gzip = new GZIPOutputStream(out);\n    gzip.write(str.getBytes());\n    gzip.close();\n    return out.toString("ISO-8859-1");\n  }\n}`
      },
      {
        language: "PHP",
        code: `<?php \n$compressed = gzcompress('Compress me', 9);\necho $compressed;\n?>`
      },
      {
        language: "C#",
        code: `string inputStr = "Hello world!";\nbyte[] inputBytes = Encoding.UTF8.GetBytes(inputStr);\n\nusing (var outputStream = new MemoryStream())\n{\n    using (var gZipStream = new GZipStream(outputStream, CompressionMode.Compress))\n        gZipStream.Write(inputBytes, 0, inputBytes.Length);\n\n    var outputBytes = outputStream.ToArray();\n    var outputbase64 = Convert.ToBase64String(outputBytes);\n    Console.WriteLine(outputbase64);\n    Console.ReadLine();\n}`
      },
      {
        language: "VB.Net",
        code: `Public Function CompressGZip(input As String, Optional encoding As Encoding = Nothing) As Byte()\n    encoding = If(encoding, Encoding.Unicode)\n    Dim bytes As Byte() = encoding.GetBytes(input)\n    Using stream As New MemoryStream()\n        Using zipStream As New GZipStream(stream, CompressionMode.Compress)\n            zipStream.Write(bytes, 0, bytes.Length)\n            Return stream.ToArray()\n        End Using\n    End Using\nEnd Function`
      },
      {
        language: "Python",
        code: `import gzip\ns_in = b"Lots of content here"\ns_out = gzip.compress(s_in)`
      }
    ],
    encryptExamples: [
      {
        language: "Java",
        code: `public string Encrypt(string consid, string conspwd, string kodefaskes, string data) {\n    string key = consid + secretkey + kodefaskes;\n    string encData = null;\n    byte[][] keys = GetHashKeys(key);\n    try {\n        encData = EncryptStringToBytes_Aes(data, keys[0], keys[1]);\n    } catch (CryptographicException) { }\n    catch (ArgumentNullException) { }\n    return encData;\n}`
      },
      {
        language: "PHP",
        code: `<?php \n$encrypt_method = 'AES-256-CBC';\n$encrypt_key = 'considsecretkeykodefaskes'; // gabungan consid + secretkey + kodefaskes\n// hash\n$key_hash = hex2bin(hash('sha256', $encrypt_key));\n// iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning\n$iv = substr(hex2bin(hash('sha256', $encrypt_key)), 0, 16);\n//Data to encrypt \n$data = "Sample Text"; \n$encrypted_data = openssl_encrypt($data, $encrypt_method, $key_hash, 0, $iv); \necho "Encrypted Text: " . $encrypted_data; \n?>`
      },
      {
        language: "C#",
        code: `public string Encrypt(string consid, string conspwd, string kodefaskes, string data) {\n    string key = consid + secretkey + kodefaskes;\n    string encData = null;\n    byte[][] keys = GetHashKeys(key);\n    try {\n        encData = EncryptStringToBytes_Aes(data, keys[0], keys[1]);\n    } catch (CryptographicException) { }\n    catch (ArgumentNullException) { }\n    return encData;\n}`
      },
      {
        language: "VB.Net",
        code: `public string Encrypt(string consid, string conspwd, string kodefaskes, string data) {\n    string key = consid + secretkey + kodefaskes;\n    string encData = null;\n    byte[][] keys = GetHashKeys(key);\n    try {\n        encData = EncryptStringToBytes_Aes(data, keys[0], keys[1]);\n    } catch (CryptographicException) { }\n    catch (ArgumentNullException) { }\n    return encData;\n}`
      },
      {
        language: "Python",
        code: `import hashlib\nfrom Crypto.Cipher import AES\nfrom Crypto.Util.Padding import pad, unpad\nimport base64\ntext = "Sample Text"\nkey = "considsecretkeykodefaskes" # consid + secretkey + kodefaskes\nmode = AES.MODE_CBC\nkey_hash = hashlib.sha256(key.encode('utf-8')).digest()\n# encrypt\nencryptor = AES.new(key_hash[0:32], mode, IV=key_hash[0:16])\nciphertext = encryptor.encrypt(pad(text.encode("utf-8"), AES.block_size))\nprint(base64.b64encode(ciphertext).decode('utf-8'))`
      }
    ],
    description:
      `Setiap pemanggilan web-service Rekam Medis harus mencantumkan header berikut:\n\n1. X-cons-id: Kode consumer (pengakses web-service) dari BPJS Kesehatan.\n2. X-timestamp: Waktu unix-based (UTC) yang digenerate client.\n3. X-signature: Signature HMAC-SHA256 dari consId & timestamp, menggunakan consumerSecret.\n\nSignature: HMAC-SHA256(consId + "&" + timestamp, secretKey)\n\nTerdapat juga contoh kompresi GZip dan enkripsi AES untuk kebutuhan utility.\n\nUntuk proses decrypt response, lihat panduan umum di bagian bawah halaman ini.`
  },
  {
    id: "decrypt",
    title: "Panduan Decrypt Response (Semua Layanan)",
    headers: ["Key: consId + consSecret + timestamp"],
    decryptFormula: "1. Dekripsi: AES 256 (mode CBC) - SHA256\n2. Dekompresi: Lz-string (decompressFromEncodedURIComponent)\nKey: consId + consSecret + timestamp request (concatenate string)",
    codeExamples: [
      {
        language: "Java",
        code: `import java.nio.charset.StandardCharsets;\nimport java.security.InvalidAlgorithmParameterException;\nimport java.security.InvalidKeyException;\nimport java.security.MessageDigest;\nimport java.security.NoSuchAlgorithmException;\nimport java.util.Base64;\n\nimport javax.crypto.BadPaddingException;\nimport javax.crypto.Cipher;\nimport javax.crypto.IllegalBlockSizeException;\nimport javax.crypto.NoSuchPaddingException;\nimport javax.crypto.SecretKey;\nimport javax.crypto.spec.IvParameterSpec;\nimport javax.crypto.spec.SecretKeySpec;\n\nimport id.go.bpjskesehatan.arsws.entitas.AesKeySpec;\n\npublic class Enc {\n\n    public static final String ALGORITHM = "AES/CBC/PKCS5Padding";\n\n    public static AesKeySpec generateKey(String key) \n            throws NoSuchPaddingException, NoSuchAlgorithmException,\n            InvalidAlgorithmParameterException, InvalidKeyException,\n            BadPaddingException, IllegalBlockSizeException {\n        MessageDigest digest = MessageDigest.getInstance("SHA-256");\n        byte[] _hashKey = digest.digest(key.getBytes(StandardCharsets.UTF_8));\n        byte[] _hashIv = new byte[16];\n        for (int i = 0; i < 16; i++) {\n            _hashIv[i] = _hashKey[i];\n        }\n        AesKeySpec aesKeySpec = new AesKeySpec();\n        SecretKeySpec _key = new SecretKeySpec(_hashKey, "AES");\n        IvParameterSpec _iv = new IvParameterSpec(_hashIv);\n        aesKeySpec.setKey(_key);\n        aesKeySpec.setIv(_iv);\n        return aesKeySpec;\n    }\n\n    public static String decrypt(String cipherText, SecretKeySpec key, IvParameterSpec iv) \n            throws NoSuchPaddingException, NoSuchAlgorithmException,\n            InvalidAlgorithmParameterException, InvalidKeyException,\n            BadPaddingException, IllegalBlockSizeException {\n        Cipher cipher = Cipher.getInstance(ALGORITHM);\n        cipher.init(Cipher.DECRYPT_MODE, key, iv);\n        byte[] plainText = cipher.doFinal(Base64.getDecoder().decode(cipherText));\n        return new String(plainText);\n    }\n    String respon = LZString.decompressFromEncodedURIComponent(lzString);\n}`
      },
      {
        language: "PHP",
        code: `<?php \nrequire_once 'vendor/autoload.php';\n// function decrypt\nfunction stringDecrypt($key, $string){\n    $encrypt_method = 'AES-256-CBC';\n    // hash\n    $key_hash = hex2bin(hash('sha256', $key));\n    // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning\n    $iv = substr(hex2bin(hash('sha256', $key)), 0, 16);\n    $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key_hash, OPENSSL_RAW_DATA, $iv);\n    return $output;\n}\n// function lzstring decompress \n// download libraries lzstring : https://github.com/nullpunkt/lz-string-php\nfunction decompress($string){\n    return \LZCompressor\LZString::decompressFromEncodedURIComponent($string);\n}\n?>`
      },
      {
        language: "C#",
        code: `namespace BpjsIntegration\n{\n    class Program\n    {\n        public string Decrypt(string key, string data)\n        {\n            string decData = null;\n            byte[][] keys = GetHashKeys(key);\n            try\n            {\n                decData = DecryptStringFromBytes_Aes(data, keys[0], keys[1]);\n            }\n            catch (CryptographicException) { }\n            catch (ArgumentNullException) { }\n            return decData;\n        }\n        private static string DecryptStringFromBytes_Aes(string cipherTextString, byte[] Key, byte[] IV)\n        {\n            byte[] cipherText = Convert.FromBase64String(cipherTextString);\n            if (cipherText == null || cipherText.Length <= 0)\n                throw new ArgumentNullException("cipherText");\n            if (Key == null || Key.Length <= 0)\n                throw new ArgumentNullException("Key");\n            if (IV == null || IV.Length <= 0)\n                throw new ArgumentNullException("IV");\n            string plaintext = null;\n            using (Aes aesAlg = Aes.Create())\n            {\n                aesAlg.Key = Key;\n                aesAlg.IV = IV;\n                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);\n                using (MemoryStream msDecrypt = new MemoryStream(cipherText))\n                {\n                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))\n                    {\n                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))\n                        {\n                            plaintext = srDecrypt.ReadToEnd();\n                        }\n                    }\n                }\n            }\n            return plaintext;\n        }\n        private byte[][] GetHashKeys(string key)\n        {\n            byte[][] result = new byte[2][];\n            Encoding enc = Encoding.UTF8;\n            SHA256 sha2 = new SHA256CryptoServiceProvider();\n            byte[] rawKey = enc.GetBytes(key);\n            byte[] rawIV = enc.GetBytes(key);\n            byte[] hashKey = sha2.ComputeHash(rawKey);\n            byte[] hashIV = sha2.ComputeHash(rawIV);\n            Array.Resize(ref hashIV, 16);\n            result[0] = hashKey;\n            result[1] = hashIV;\n            return result;\n        }\n        ///Decrypted\n        string LZDecrypted = _security.Decrypt(key, textenc);\n        string result = LZString.decompressFromEncodedURIComponent(LZDecrypted);   \n    }   \n}`
      },
      {
        language: "Python",
        code: `import hashlib\nfrom Crypto.Cipher import AES\nfrom Crypto.Util.Padding import pad, unpad\nimport base64\nimport lzstring\n\ndef decrypt(key, txt_enc):\n    x = lzstring.LZString()\n    key_hash = hashlib.sha256(key.encode('utf-8')).digest()\n    mode = AES.MODE_CBC\n    # decrypt\n    decryptor = AES.new(key_hash[0:32], mode, IV=key_hash[0:16])\n    plain = decryptor.decrypt(base64.b64decode(txt_enc))\n    decompress = x.decompressFromEncodedURIComponent(plain.decode('utf-8'))\n    return decompress`
      }
    ],
    description: `Response kembalian dari web service BPJS (VClaim, PCare, iCare, dsb) sudah dalam bentuk compress dan terenkripsi.\n\nKompresi service menggunakan metode: Lz-string\nEnkripsi menggunakan metode: AES 256 (mode CBC) - SHA256 dan key enkripsi: consId + consSecret + timestamp request (concatenate string)\n\nLangkah proses dalam melakukan decrypt data response sebagai berikut:\n1. Dekripsi: AES 256 (mode CBC) - SHA256\n2. Dekompresi: Lz-string (decompressFromEncodedURIComponent)\n\nKey: consId + consSecret + timestamp request (concatenate string)\n\nContoh kode tersedia untuk Java, PHP, C#, dan Python.`
  }
]; 