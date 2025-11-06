# Configuration EmailJS

## Variables d'environnement requises

Pour que le formulaire de contact fonctionne, vous devez configurer ces variables d'environnement :

1. `VITE_EMAILJS_SERVICE_ID` - Votre Service ID EmailJS
2. `VITE_EMAILJS_TEMPLATE_ID` - Votre Template ID EmailJS  
3. `VITE_EMAILJS_PUBLIC_KEY` - Votre Public Key EmailJS

## Configuration sur Render.com

1. Allez dans votre dashboard Render
2. Sélectionnez votre service (photo-portfolio)
3. Allez dans l'onglet "Environment"
4. Ajoutez les trois variables d'environnement :
   - **Key**: `VITE_EMAILJS_SERVICE_ID` **Value**: `service_vlkgd2s`
   - **Key**: `VITE_EMAILJS_TEMPLATE_ID` **Value**: `template_6pd29p3`
   - **Key**: `VITE_EMAILJS_PUBLIC_KEY` **Value**: `E9EbI_vBjCK3XZK-G`
5. Cliquez sur "Save Changes"
6. Redéployez votre service

## Configuration locale (pour développement)

Créez un fichier `.env` à la racine du projet :

```env
VITE_EMAILJS_SERVICE_ID=service_vlkgd2s
VITE_EMAILJS_TEMPLATE_ID=template_6pd29p3
VITE_EMAILJS_PUBLIC_KEY=E9EbI_vBjCK3XZK-G
```

**Important**: Redémarrez votre serveur de développement après avoir créé/modifié le fichier `.env`.

## Vérification

1. Ouvrez la console du navigateur (F12)
2. Allez sur la page de contact
3. Si les variables ne sont pas configurées, vous verrez un message d'erreur dans la console

## Dépannage

Si le formulaire ne fonctionne pas :
1. Vérifiez que `client:load` est présent sur `<ContactForm />` dans `contact.astro`
2. Vérifiez que les variables d'environnement sont définies sur Render
3. Vérifiez la console du navigateur pour les erreurs
4. Vérifiez que votre template EmailJS utilise les variables : `{{from_name}}`, `{{from_email}}`, `{{message}}`

