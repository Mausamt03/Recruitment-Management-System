public class SecurityUtils {

    /*
     * Check if current user has access to field
     */
    public static Boolean hasFieldAccess(
        Schema.SObjectField fieldReference
    ) {
        return fieldReference.getDescribe().isAccessible();
    }

}